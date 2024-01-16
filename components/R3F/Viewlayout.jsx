import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { LanguageContext } from "@/contexts/Langaugecontext";
import clsx from "clsx";
import Soundguide from "../Soundguide";

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

const Viewlayout = ({children, url}) => {
    const {language} = useContext(LanguageContext)
    const router = useRouter();
    // const [soundguide, setSoundguide] = useState(false);
    function handleRefresh() {
        router.reload();
    };
    return(
        <div className="h-screen w-screen bg-white">
            {children}
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
        </div>
    )
};

export default Viewlayout;

