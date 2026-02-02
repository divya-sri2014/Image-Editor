let filters ={
    brightness: {
        value:100,
        min:0,
        max:200,
        unit:"%",
    },
    contrast: {
        value:100,
        min:0,
        max:200,
        unit:"%",
    },
    saturation: {
        value:100,
        min:0,
        max:200,
        unit:"%",
        
    },
    hueRotation: {
        value:0,
        min:0,
        max:360,
        unit:"deg",
    },
     blur:{
        value:0,
        min:0,
        max:20,
        unit:"px",
    },
    grayscale:{
        value:0,
        min:0,
        max:100,
        unit:"%",
    },
    sepia:{
        value:0,
        min:0,
        max:100,
        unit:"%",
    },
    invert:{
        value:0,
        min:0,
        max:100,
        unit:"%",
    },
    opacity:{
        value:100,
        min:0,
        max:100,
        unit:"%",
    },
   
}

const imagecanvas = document.getElementById("imag-canvas")
const imageinput = document.getElementById("image-input")
const canvasCtx = imagecanvas.getContext("2d")
const resetbutton = document.querySelector("#reset-btn")
const downloadbutton = document.querySelector("#download-btn")
const presetContainer = document.querySelector(".presets")

let file = null
let img = null

const filtersContainer = document.querySelector(".filters")

function formatName(name){
    return name.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())
}

function createfilterElement(name, unit ="%", value, min, max){
    const div=document.createElement("div")
    div.classList.add("filter")

    const label = document.createElement("label")
    label.htmlFor = name
    label.innerText = formatName(name)

    const input=document.createElement("input")
    input.type="range"
    input.id=name
    input.min=min
    input.max=max
    input.value=value

    div.appendChild(label)
    div.appendChild(input)

    input.addEventListener("input", (e) =>{
        filters[name].value = input.value
        applyFilters()
    })
    return div
}
function createfilters(){
Object.keys(filters).forEach(key =>{
   const filterElement = createfilterElement(key, filters[key].unit, filters[key].value, filters[key].min, filters[key].max)

   filtersContainer.appendChild(filterElement)
}) 
}

createfilters()



imageinput.addEventListener("change", (e) => {
    const file = e.target.files[0]
    if (!file) return

    const imagePlaceholder = document.querySelector(".placeholder")
    imagecanvas.style.display = "block"
    imagePlaceholder.style.display = "none"

    img = new Image()
    img.src = URL.createObjectURL(file)

    img.onload = () => {
        // set canvas size to image size (you can scale this instead if needed)
        imagecanvas.width = img.naturalWidth
        imagecanvas.height = img.naturalHeight
        applyFilters() // draws the image with current filters
    }
})

resetbutton.addEventListener("click", () =>{
    filters ={
    brightness: {
        value:100,
        min:0,
        max:200,
        unit:"%",
    },
    contrast: {
        value:100,
        min:0,
        max:200,
        unit:"%",
    },
    saturation: {
        value:100,
        min:0,
        max:200,
        unit:"%",
        
    },
    hueRotation: {
        value:0,
        min:0,
        max:360,
        unit:"deg",
    },
     blur:{
        value:0,
        min:0,
        max:20,
        unit:"px",
    },
    grayscale:{
        value:0,
        min:0,
        max:100,
        unit:"%",
    },
    sepia:{
        value:0,
        min:0,
        max:100,
        unit:"%",
    },
    invert:{
        value:0,
        min:0,
        max:100,
        unit:"%",
    },
    opacity:{
        value:100,
        min:0,
        max:100,
        unit:"%",
    },
   }
applyFilters()

  filtersContainer.innerHTML = ""
  createfilters()
})

downloadbutton.addEventListener("click", () =>{
   const link =  document.createElement("a")
    link.download = "edited-image.png"
    link.href = imagecanvas.toDataURL()
    link.click()
})



function applyFilters() {
    if (!img || !img.src) return
    canvasCtx.clearRect(0, 0, imagecanvas.width, imagecanvas.height)
    canvasCtx.filter = [
        `brightness(${filters.brightness.value}${filters.brightness.unit})`,
        `contrast(${filters.contrast.value}${filters.contrast.unit})`,
        `saturate(${filters.saturation.value}${filters.saturation.unit})`,
        `hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})`,
        `blur(${filters.blur.value}${filters.blur.unit})`,
        `grayscale(${filters.grayscale.value}${filters.grayscale.unit})`,
        `sepia(${filters.sepia.value}${filters.sepia.unit})`,
        `invert(${filters.invert.value}${filters.invert.unit})`,
        `opacity(${filters.opacity.value}${filters.opacity.unit})`
    ].join(' ')
    canvasCtx.drawImage(img, 0, 0, imagecanvas.width, imagecanvas.height)
}

const presets = {
  drama: {
    brightness: 95,
    contrast: 140,
    saturation: 120,
    hueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 10,
    invert: 0,
    opacity: 100,
  },
    vintage: {
    brightness: 105,
    contrast: 90,
    saturation: 85,
    hueRotation: -10,
    blur: 0,
    grayscale: 10,
    sepia: 35,
    invert: 0,
    opacity: 100,
  },
    oldSchool: {
    brightness: 110,
    contrast: 80,
    saturation: 70,
    hueRotation: -20,
    blur: 1,
    grayscale: 20,
    sepia: 50,
    invert: 0,
    opacity: 100,
  },
    cinematic: {
    brightness: 95,
    contrast: 130,
    saturation: 110,
    hueRotation: 15,
    blur: 0,
    grayscale: 0,
    sepia: 5,
    invert: 0,
    opacity: 100,
  }
};

Object.keys(presets).forEach(presetName => {
  const presetButton = document.createElement("button")
  presetButton.classList.add("btn")
  presetButton.innerText = presetName
  presetContainer.appendChild(presetButton)

   presetButton.addEventListener("click", () => {

    const preset = presets[presetName]
    Object.keys(preset).forEach(filterName => {
        filters[ filterName ].value = preset[filterName]
    })
    applyFilters()

    filtersContainer.innerHTML = ""
    createfilters()
  })
})