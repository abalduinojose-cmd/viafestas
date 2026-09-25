"""
Mapa estático da Localização: mosaico de tiles do OpenStreetMap em zoom de
rua (17), centrado no endereço real da Via Festas e recolorido como mapa de
papel na paleta do site: fundo branco lavanda, quadras em lilás acinzentado,
ruas brancas, vias principais em lavanda e os nomes das ruas em tinta escura, legíveis.
O pino NÃO é assado aqui: a UI desenha o marcador no centro exato.
Requer o crédito visível "© OpenStreetMap" onde o mapa aparecer.

    python scripts/mapa.py
"""
import io, math, time, urllib.request
import numpy as np
from PIL import Image

LAT, LNG, Z = -22.5170231, -43.1912147, 17
W, H, T = 1600, 1100, 256

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

# Luminância vira uma rampa de papel: tinta (texto e contorno) -> areia -> creme.
tinta = np.array([18, 15, 26]) / 255
areia = np.array([222, 214, 236]) / 255
creme = np.array([248, 245, 253]) / 255
t = np.clip((L - 0.35) / 0.6, 0, 1)[..., None]
base = np.where(t < 0.8, tinta + (areia - tinta) * (t / 0.8), areia + (creme - areia) * ((t - 0.8) / 0.2))

# Via local (branca no OSM) fica branca de verdade; via principal (amarelo e
# laranja no OSM, R alto e B baixo) vira lavanda.
branca = np.clip((L - 0.962) / 0.038, 0, 1)[..., None]
quente = (np.clip((R - 0.93) / 0.07, 0, 1) * np.clip((0.86 - B) / 0.15, 0, 1) * (G > 0.72))[..., None]
ouro = np.array([193, 142, 246]) / 255
branco = np.array([255, 253, 248]) / 255
cor = base * (1 - branca) + branco * branca
cor = cor * (1 - quente) + ouro * quente
# Verde de praça e mata vira um sálvia apagado, para o olho achar a quadra.
verde = ((G - R) > 0.06) & ((G - B) > 0.06)
salvia = np.array([214, 222, 206]) / 255
cor[verde] = cor[verde] * 0.4 + salvia * 0.6

Image.fromarray((np.clip(cor, 0, 1) * 255).astype("uint8")).save("src/assets/mapa/valparaiso-petropolis.jpg", quality=82, optimize=True)
print("mapa salvo", W, H)
