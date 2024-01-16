import Viewlayout from "@/components/R3F/Viewlayout";
import Viewcontent from "@/components/R3F/Viewcontent";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { LanguageContext } from "@/contexts/Langaugecontext";
import clsx from "clsx";
import { collection_KOR, collection_ENG, collection_CH, collection_TH, collection_VI } from "@/data/collectionData";
import Navbar from "@/components/Navbar";

const inputData = {
    KOR: collection_KOR,
    ENG: collection_ENG,
    CH: collection_CH,
    TH: collection_TH,
    VI: collection_VI,
};

const popupText = {
    KOR: "화면 터치 후 확대해 보세요!",
    ENG: "Touch the screen to zoom in!",
    CH: "触摸屏幕即可放大！",
    TH: "แตะที่หน้าจอเพื่อซูมเข้า!",
    VI: "Chạm vào màn hình để phóng to!",
};

export default function Paintings() {
    const {language} = useContext(LanguageContext);
    const router = useRouter();
    const {slug, year} = router.query;
    const [popup, setPopup] = useState(true);
    const [data, setData] = useState(null);
    const [video, setVideo] = useState();
    
    useEffect(()=> {
        const mid = slug?.replace("", "");
        if(slug !== undefined && inputData?.[language]?.[mid]) {
            setData(inputData[language][mid]);
        };
    }, [slug, language]);

    useEffect(()=>{
        setVideo(`${process.env.NEXT_PUBLIC_CLOUDFLARE_R2_ENDPOINT}/digital-docents/${language}/schema-docent-${year}-${language}.webm`)
    }, [language, year]);

     const changeExhibit = (offset) => {
        const currentIndex = Number(slug?.replace("", ""));
        let newIndex = currentIndex + offset;
        if (newIndex < 0) {
          newIndex = inputData[language].length - 1;
        } else if (newIndex >= inputData[language].length) {
          newIndex = 0;
        }
        // router.replace(`/pastexhibit/${newIndex}?time=${time}`);
        const currentQuery = { ...router.query };

        // Update the time parameter
        currentQuery.year = inputData[language][newIndex].time;
      
        // Use router.replace to update the URL with the new query parameters
        // router.replace(`/pastexhibit/${newIndex}?time=${currentQuery}`);
        router.replace({
          pathname: `/paintings/${newIndex}`,
          query: currentQuery,
        });
    };

    return(
        <>
        {data && (
            <Viewlayout url={video}>
            {/* 3D 콘텐츠 구역 */}
            <Viewcontent 
                url={data.imgname}
                width={data.width * 0.7}
                height={data.height * 0.7}
            />
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
            {popup && (
                <div className="absolute bg-black bg-opacity-40 h-5/6 w-full md:w-[600px] bottom-16 left-1/2 transform -translate-x-1/2"
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
            {/* <Navbar 
                url={video}
            /> */}
        </Viewlayout>
        )}
        </>
    )
};

