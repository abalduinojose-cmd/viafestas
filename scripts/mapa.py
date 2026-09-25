"""
Mapa estático da Localização: mosaico de tiles do OpenStreetMap em zoom de
rua (17), centrado no endereço real da Via Festas e recolorido como mapa de
modo noite na paleta do site: fundo preto, quadras em violeta escuro,
ruas claras, vias principais em lavanda e nomes das ruas em branco e os nomes das ruas em tinta escura, legíveis.
O pino NÃO é assado aqui: a UI desenha o marcador no centro exato.
Requer o crédito visível "© OpenStreetMap" onde o mapa aparecer.

    python scripts/mapa.py
"""
import io, math, time, urllib.request
import numpy as np
from PIL import Image, ImageFilter

LAT, LNG, Z = -22.5170231, -43.1912147, 17
W, H, T = 2200, 1200, 256

n = 2 ** Z
xf = (LNG + 180) / 360 * n
lr = math.radians(LAT)
yf = (1 - math.log(math.tan(lr) + 1 / math.cos(lr)) / math.pi) / 2 * n
x0, y0 = math.floor(xf - W / 2 / T) - 1, math.floor(yf - H / 2 / T) - 1
x1, y1 = math.floor(xf + W / 2 / T) + 1, math.floor(yf + H / 2 / T) + 1

mosaico = Image.new("RGB", ((x1 - x0 + 1) * T, (y1 - y0 + 1) * T))
for x in range(x0, x1 + 1):
    for y in range(y0, y1 + 1):
        req = urllib.request.Request(
            f"https://tile.openstreetmap.org/{Z}/{x}/{y}.png",
            headers={"User-Agent": "ViaFestasSite/1.0 (mapa estatico, geracao unica)"},
        )
        mosaico.paste(Image.open(io.BytesIO(urllib.request.urlopen(req).read())).convert("RGB"), ((x - x0) * T, (y - y0) * T))
        time.sleep(0.1)

px, py = round((xf - x0) * T), round((yf - y0) * T)
img = mosaico.crop((px - W // 2, py - H // 2, px + W // 2, py + H // 2))

a = np.asarray(img).astype(float) / 255
R, G, B = a[..., 0], a[..., 1], a[..., 2]
L = 0.2126 * R + 0.7152 * G + 0.0722 * B

# Modo noite na linguagem da marca. Cada classe do estilo padrão do OSM
# vira uma cor da paleta:
#   fundo bege (L ~0,94)        -> noite
#   quadras e prédios (cinza)   -> violeta escuro
#   mata e praça (verde)        -> verde quase preto
#   via local (branca)          -> violeta médio (escura o bastante para o
#                                  nome da rua, em branco, ler por cima)
#   via principal (amarelo/lar.)-> lavanda do logo
#   texto e ícones (escuros)    -> branco pérola
noite = np.array([13, 11, 20]) / 255
quadra = np.array([38, 32, 56]) / 255
mata = np.array([19, 27, 24]) / 255
via = np.array([62, 54, 88]) / 255
principal = np.array([193, 142, 246]) / 255
texto = np.array([241, 236, 248]) / 255

cor = np.zeros_like(a) + noite
# quadras: cinza neutro mais escuro que o fundo
cinza = (L < 0.915) & (L > 0.6) & ((R - B) < 0.1)
cor[cinza] = quadra
verde = ((G - R) > 0.05) & ((G - B) > 0.04)
cor[verde] = mata
branca = np.clip((L - 0.962) / 0.038, 0, 1)[..., None]
quente = (np.clip((R - 0.93) / 0.07, 0, 1) * np.clip((0.86 - B) / 0.15, 0, 1) * (G > 0.72))[..., None]
cor = cor * (1 - branca) + via * branca
cor = cor * (1 - quente) + principal * quente
# texto e ícones: quanto mais escuro no original, mais claro aqui
tinta = np.clip((0.5 - L) / 0.3, 0, 1)[..., None]
cor = cor * (1 - tinta) + texto * tinta
# Brilho de neon nas vias principais: a máscara das vias quentes, borrada,
# soma lavanda por cima (modo "screen"), como avenida acesa vista do alto.
brilho = Image.fromarray((quente[..., 0] * 255).astype("uint8")).filter(ImageFilter.GaussianBlur(9))
g = (np.asarray(brilho).astype(float) / 255)[..., None] * 0.85
cor = 1 - (1 - cor) * (1 - principal * g)
# Vinheta suave: o olho vai para o centro, onde fica o pino.
yy, xx = np.mgrid[0:H, 0:W]
d = np.sqrt(((xx - W / 2) / (W / 2)) ** 2 + ((yy - H / 2) / (H / 2)) ** 2)
cor = cor * (1 - np.clip((d - 0.55) / 0.9, 0, 1) * 0.55)[..., None]
Image.fromarray((np.clip(cor, 0, 1) * 255).astype("uint8")).save("src/assets/mapa/valparaiso-petropolis.jpg", quality=82, optimize=True)
print("mapa salvo", W, H)
