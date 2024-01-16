import { useState, useEffect, Suspense, useContext } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { MathUtils } from "three";
import * as THREE from 'three';
import clsx from "clsx";
import { LanguageContext } from "@/contexts/Langaugecontext";
import Spot from "@/components/R3F/Spotlight";
import IDBAnimationModel from "@/components/R3F/IndexedDB";
import { modelData_KOR, modelData_ENG, modelData_CH, modelData_TH, modelData_VI } from "@/data/modelData";

const iconText1 = {
    KOR: "초기화",
    ENG: "Reset",
    CH: "重置",
    TH: "รีเซ็ต",
    VI: "cài lại",
};

const iconText2 = {
    KOR: "작품해설",
    ENG: "Commentary on the Work",
    CH: "对作品的评论",
    TH: "ความเห็นเกี่ยวกับการทำงาน",
    VI: "Bình luận về tác phẩm",
};

const iconText3 = {
    KOR: "챗봇안내",
    ENG: "Chatbot Guide",
    CH: "聊天机器人信息",
    TH: "ข้อมูลแชทบอท",
    VI: "Thông tin Chatbot",
};

const popupText = {
    KOR: "화면 터치 후 확대해 보세요!",
    ENG: "Touch the screen to zoom in!",
    CH: "触摸屏幕即可放大！",
    TH: "แตะที่หน้าจอเพื่อซูมเข้า!",
    VI: "Chạm vào màn hình để phóng to!",
};

const inputData = {
    KOR: modelData_KOR,
    ENG: modelData_ENG,
    CH: modelData_CH,
    TH: modelData_TH,
    VI: modelData_VI,
};

export default function Modelpage({}) {
    const {language} = useContext(LanguageContext);
    const router = useRouter();
    const {slug} = router.query;
    const [popup, setPopup] = useState(true);
    const [data, setData] = useState(null);
    const [color, setColor] = useState("#F5F049");

    useEffect(()=> {
        // Fetch and set data based on the slug from the router
        const mid = slug?.replace("", "");
        if(slug !== undefined && inputData?.[language]?.[mid]) {
            setData(inputData[language][mid]);
        }
    }, [slug, language])

    const changeExhibit = (offset) => {
        const currentIndex = Number(slug?.replace("", ""));
        let newIndex = currentIndex + offset;
        if (newIndex < 0) {
          newIndex = inputData[language].length - 1;
        } else if (newIndex >= inputData[language].length) {
          newIndex = 0;
        }

        router.replace(`/modelpage/${newIndex}`);
    };
    function handleRefresh() {
        router.reload();
    };
    // console.log(modelData);
    return(
        <div className="h-screen w-screen bg-white bg-cover bg-no-repeat">
            {/* 3D 콘텐츠 구역 */}
            {data && (
                <>
                    {/* <div className={clsx("absolute h-[91%] w-full screen-w:h-[95%] bottom-16 screen-w:bottom-28 left-1/2 transform -translate-x-1/2 bg-white")}> */}
                    <div className={clsx("absolute h-full w-full md:h-full md:w-full bottom-16 left-1/2 transform -translate-x-1/2 bg-white")}>
                        <div className="h-10 w-10 md:h-[50px] md:w-[50px] z-10 absolute bottom-4 right-12 md:bottom-20 md:right-20 border-2 border-black rounded-full bg-orange-500"
                            onClick={()=> setColor("#F5F049")}
                        />
                        <div className="h-10 w-10 md:h-[50px] md:w-[50px] z-10 absolute bottom-4 right-28 md:bottom-20 md:right-64 border-2 border-black rounded-full bg-white"
                            onClick={()=> setColor("#FFFFFF")}
                        />
                        <Suspense fallback={null}>
                            <Canvas
                                gl={{
                                    antialias:true,
                                    colorSpace: THREE.LinearSRGBColorSpace,
                                    toneMapping: THREE.ACESFilmicToneMapping,
                                    toneMappingExposure: 1.0,
                                }}
                                camera={{
                                    fov: 75,
                                    aspect: window.innerWidth / window.innerHeight,
                                    near: 0.01,
                                    far: 10000,
                                    position: [0, 0, 10],
                                    rotation: [0, 0, 0]
                                }}
                                shadows
                            >
                                <Suspense fallback={null}>
                                    <IDBAnimationModel 
                                        keyName={data.keyname}
                                        modelSrc={data.url}
                                        position={data.position}
                                        rotation={[0, 0, 0]}
                                        scale={data.scale}
                                    />
                                </Suspense>
                                <OrbitControls 
                                    minDistance={1.5}
                                    maxDistance={5}
                                    minAzimuthAngle={MathUtils.degToRad(-45)}
                                    maxAzimuthAngle={MathUtils.degToRad(45)}
                                    maxPolarAngle={MathUtils.degToRad(90)}
                                    minPolarAngle={MathUtils.degToRad(70)}
                                    makeDefault
                                />
                                <mesh position={[0, 0, -4]} rotation={[0, 0, 0]} receiveShadow>
                                    <boxGeometry attach="geometry" args={[100, 100, 2]} />
                                    <meshPhongMaterial color={"#FFFFFF"} attach="material" />
                                </mesh>
                                <Spot position={[0, 8, 5]} color={color} />
                                <ambientLight intensity={3} />
                                {/* <color attach="background" args={["#FFFFFF"]} /> */}
                            </Canvas>
                        </Suspense>
                    </div>
                    {popup && (
                        <div className="absolute bg-black bg-opacity-40 h-5/6 w-full md:h-[92%] md:w-[600px] bottom-16 left-1/2 transform -translate-x-1/2"
                            onClick={()=>setPopup(!popup)}
                        >
                            <div className="w-5/6 h-5/6 flex flex-col space-y-32 px-4 mt-16 mx-auto items-center justify-end text-center">
                                <div className="flex flex-col space-y-2">
                                    <span className="text-white font-bold text-sm md:text-base">{data.title}</span>
                                    <span className="text-gray-500 font-bold text-xl">{''}</span>
                                </div>
                                <div className="flex flex-col space-y-2 mx-auto w-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
                                        className="h-12 w-12 md:h-20 md:w-20 animate-bounce mx-auto text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                                    </svg>
                                    <span className="text-white font-bold text-sm md:text-base">{popupText[language]}</span>
                                </div>
                                <div className="flex flex-col w-full mx-auto">
                                    <div className="flex justify-between w-full">
                                        <div className="flex flex-col space-y-2">
                                            <span className="font-bold text-white text-base md:text-lg">{data.name}</span>
                                            <span className="font-bold text-white text-sm md:text-base">{data.overview}</span>
                                            <span className="font-bold text-white text-sm md:text-base">{data.overview1}</span>
                                        </div>
                                        <span className="font-bold text-white text-lg md:text-2xl">{data.order}{'.'}</span>
                                    </div>
                                    <div className="h-[1px] w-full bg-white mt-3"/>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
           {/* 그림 넘기기 버튼 */}
           <div className="absolute left-24 bottom-40 md:left-40 md:bottom-80">
                <button
                    className="h-full w-full"
                >   
                    <svg 
                        id="left"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" 
                        className="w-8 h-8 md:w-12 md:h-12 text-black"
                        onClick={()=>changeExhibit(-1)}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>
            </div>
            <div className="absolute right-24 bottom-40 md:right-40 md:bottom-80">
                <button
                    className="h-full w-full"
                >   
                    <svg 
                        id="right"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" 
                        className="w-8 h-8 md:w-12 md:h-12 text-black"
                        onClick={()=>changeExhibit(1)}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
          {/* 초기화 */}
          <div className="h-[200px] w-[100px] absolute left-2 md:left-10 bottom-80">
                <div className="flex flex-col mx-auto text-center space-y-2">
                    <button 
                        className="h-8 w-8 ml-8 md:h-12 md:w-12 md:ml-6"
                        onClick={handleRefresh}
                    > 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
                        className="h-full w-full text-black">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                    </button>
                    <span className="text-black text-sm md:text-base font-bold">{iconText1[language]}</span>
                </div>
            </div>
            {/* 작품해설 */}
            <div className="h-[140px] w-[100px] absolute left-2 md:left-10 bottom-72"
                // onClick={() => setSoundguide(!soundguide)}
            >
                <div className="flex flex-col mx-auto text-center space-y-2">
                    <button className="h-8 w-8 ml-8 md:h-12 md:w-12 md:ml-6"> 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
                            className="w-full h-full text-black">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                        </svg>
                        </button>
                        <span className="text-black text-sm md:text-base font-bold">{iconText2[language]}</span>
                </div>
            </div>
             {/* 챗봇안내 */}
             <div className="h-[140px] w-[100px] absolute bottom-48 left-2 md:left-10">
                <div className="flex flex-col mx-auto text-center space-y-2">
                    <button className="h-8 w-8 ml-8 md:h-12 md:w-12 md:ml-6"> 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
                        className="w-full h-full text-black">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                        </svg>
                    </button>
                        <span className="text-black text-sm md:text-base font-bold">{iconText3[language]}</span>
                </div>
            </div>
            <button className={clsx("absolute left-12 bottom-20 md:left-16 md:bottom-28")}
                onClick={()=> router.push("/")}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
                    className="w-8 h-8 md:w-12 md:h-12 text-black">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
            </button>
            <Navbar />
        </div>
    )
};


