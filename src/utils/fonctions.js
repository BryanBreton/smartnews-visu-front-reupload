export function getImage(images,indiceImage,urlImage,tempoImg){
  const indiceDerniereImage = images.length - 1
  indiceImage === indiceDerniereImage ? indiceImage = 0 : indiceImage ++
  urlImage = "data:image/jpg;base64,"+images[indiceImage].img
  tempoImg = images[indiceImage].tempo*1000
  return [indiceImage,urlImage,tempoImg]
}