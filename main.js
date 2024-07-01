const lenis = new Lenis()
  gsap.registerPlugin(ScrollTrigger)
lenis.on('scroll', (e) => {
  console.log(e)
})

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)
//badge //모든badge에 다 
gsap.to(".badge",{
    rotation:360,
    duration:5,
    ease:"none",
    repeat:-1
})

///////////////////////////////////////////////////////////
//얼굴

let wrapper=document.querySelector(".tracker")
let emoji=document.querySelector(".emoji")
let emojiFace=document.querySelector(".emoji-face")

let moveEvent=function(e){
    let wrapperRect=wrapper.getBoundingClientRect() //wrapper에 대한 공간정보
    console.log(wrapperRect)

    let relX=e.clientX - (wrapperRect.left + wrapperRect.width/2)
    let relY=e.clientY - (wrapperRect.top + wrapperRect.height/2)
    let emojiMaxDisplacement = 50;
    let emojiFaceMaxDisplacement=75

    let emojiFaceDisplacementX=(relX / wrapperRect.width) * emojiFaceMaxDisplacement
    let emojiFaceDisplacementY=(relY / wrapperRect.height) * emojiFaceMaxDisplacement

    let emojiMaxDisplacementX=(relX / wrapperRect.width) * emojiMaxDisplacement
    let emojiMaxDisplacementY=(relY / wrapperRect.height) * emojiMaxDisplacement



    gsap.to(emojiFace,{
      x:emojiFaceDisplacementX,
      y:emojiFaceDisplacementY,
      duration:0.35,
      ease:"powet3.out"

    })
    gsap.to(emoji,{
      x:emojiMaxDisplacementX,
      y:emojiMaxDisplacementY,
      duration:0.35,
      ease:"powet3.out"
    })

}


/////////////첫번째 영역 자체 애니//////////////////////////////////////////



//첫번쨰 영역

let stickys=document.querySelectorAll(".sticky")

stickys.forEach(function(sticky){
  gsap.to(sticky,{
    scrollTrigger:{
      trigger: sticky,
      start:"top top",
      end:"+=150%",
      scrub:1,    
    },
      y:250,
      scale:0.75,
      rotation:-15,
      ease:"power3.out"
  })
})

//두번째 영역

let conScales=document.querySelectorAll('.con-scale')
conScales.forEach(function(conScale){
  gsap.fromTo(conScale,{
    y:100,
    scale:0.7,
    rotation:15,
  
  },{
    scrollTrigger:{
      trigger:conScale,
      start:"top 80%",
      end:"top 20%",
      scrub:2,
  
    },
    y:0,
    scale:1,
    duration:1,
    rotation:0,
    ease:"power3.out",
  })


  //두번째 영역의 각각의 이미지 애니

  let secImgs=document.querySelectorAll(".section-images")
  secImgs.forEach(function(secImg){

    let imgs=secImg.querySelectorAll('img')
    let secImgParent=secImg.parentNode;

    imgs.forEach(function(img,index){
      let imgDey= index * 0.8;
  
      gsap.set(img,{y:400})
      gsap.timeline({
        scrollTrigger:{
          trigger:secImgParent,
          start:"top 60%",
          end:"top top",
          scrub:2,
        }
      })
      .to(img,{
        y:0,
        duration:2,
        delay:imgDey,
        ease:"power3.out"
      })
    })
  })


 
})
//세번째 페이지 
//글자 자르기

//const text = new SplitType('#target', { types: 'words, chars' })

let splitTypes=document.querySelectorAll(".heading-large")

splitTypes.forEach(function(char,i){
  let parent=char.parentNode.parentNode;
  const text = new SplitType(char, { types: 'chars' })
  console.log(text)

  gsap.from(text.chars,{
    opacity:0,
    yPercent:100,
    duration:0.4,
    stagger:0.04,
    scrollTrigger:{
      trigger:parent,
      start:"top 60%",
      end:"top 20%",
    }
  })
})

//텍스트 사라지는 방향 애니메이션
gsap.to("[data-direct]",{//[data-direct] : 속성중에 data-direct가 있는것들 모두 다 호출
 x:(i,el)=>-(el.getAttribute("data-direct")) * 800  , //el은 data-direct 속성을 가지고 있는 요소들을 하나씩 받아옴, i인덱스 번호
ease:"none",
scrollTrigger:{
  trigger:".text_wrap",
  start:"top 20%",
  end:"top top",
  duration:2,
  scrub:2
}
  })
//둥근얼굴 애니
gsap.to("[data-speed]",{
  y:(i,el)=>(el.getAttribute("data-speed") - 1) * 230,
  ease:"none",
  scrollTrigger:{
    start:0,// 스크롤트리거가 시작되는 스크롤위치
    end:"max",//스크롤 트리거가 끝나는 스크롤 위치
    scrub:2
  }
})
let rarr=document.querySelectorAll("[data-speed]")

gsap.from(rarr[0],{
  scrollTrigger:{
    trigger:".website-content2",
    start:"top 100%",
    end:"top top",
    scrub:2
  },rotation:45

})
gsap.from(rarr[1],{
  scrollTrigger:{
    trigger:".text-black",
    start:"top 100%",
    end:"top top",
    scrub:2
  },rotation:-45

})
gsap.from(rarr[2],{
  scrollTrigger:{
    trigger:".website-content2",
    start:"80% 100%",
    end:"bottom top",
    scrub:2
  },
  rotation:45

})

//wave

gsap.to(".wave",{
  xPercent:20,
  scrollTrigger:{
    trigger:".website-content2",
    start:"90% 100%",
    end:"+=100%",
    scrub:1,
    }
})



wrapper.addEventListener("mousemove",moveEvent)
