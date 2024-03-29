import { FontsizeContext } from "@/contexts/Fontsizecontext";
import { LanguageContext } from "@/contexts/Langaugecontext";
import { useRouter } from "next/router";
import { useContext } from "react";
import { collection_KOR, collection_ENG, collection_CH, collection_TH, collection_VI } from "@/data/collectionData";
import { modelData_KOR, modelData_ENG, modelData_CH, modelData_TH, modelData_VI } from "@/data/modelData";
import clsx from "clsx";

const introButton = {
    KOR: (size)=> (
        <div className={`flex flex-col ${size ? `space-y-3` : `space-y-2`}`}>
            <span className={`font-bold animate-bounce ${size ? `text-base` : `text-sm`}`}>{"미술관 그림 보기"}</span>
            <span className={`font-bold ${size ? `text-sm` : `text-xs`}`}>{"3D 그림 감상"}</span>
            {/* <span className={`font-bold ${size ? `text-sm` : `text-xs`}`}>{"쉐마국제미술상"}</span> */}
        </div>
    ),
    ENG: (size) => (
        <div className={`flex flex-col ${size ? `space-y-3` : `space-y-2`}`}>
            <span className={`font-bold animate-bounce ${size ? `text-base` : `text-sm`}`}>{"View Paintings"}</span>
            <span className={`font-bold ${size ? `text-sm` : `text-xs`}`}>{"Enjoy 3D paintings"}</span>
            {/* <span className={`font-bold ${size ? `text-sm` : `text-xs`}`}>{"Jai-Kwan Kim Career Exprience"}</span> */}
        </div>
    ),
    CH: (size) => (
        <div className={`flex flex-col ${size ? `space-y-3` : `space-y-2`}`}>
            <span className={`font-bold animate-bounce ${size ? `text-base` : `text-sm`}`}>{"观赏美术馆画作"}</span>
            <span className={`font-bold ${size ? `text-sm` : `text-xs`}`}>{"享受3D绘画"}</span>
            {/* <span className={`font-bold ${size ? `text-sm` : `text-xs`}`}>{"Jai-Kwan Kim 主要职业经历"}</span> */}
        </div>
    ),
    TH: (size) => (
        <div className={`flex flex-col ${size ? `space-y-3` : `space-y-2`}`}>
            <span className={`font-bold animate-bounce ${size ? `text-base` : `text-sm`}`}>{"ชมภาพวาดของพิพิธภัณฑ์ศิลปะ"}</span>
            <span className={`font-bold ${size ? `text-sm` : `text-xs`}`}>{"เพลิดเพลินกับภาพวาด 3 มิติ"}</span>
            {/* <span className={`font-bold ${size ? `text-sm` : `text-xs`}`}>{"ประสบการณ์การทำงานระดับเมเจอร์ของแจกวาน คิม"}</span> */}
        </div>
    ),
    VI: (size) => (
        <div className={`flex flex-col ${size ? `space-y-3` : `space-y-2`}`}>
            <span className={`font-bold animate-bounce ${size ? `text-base` : `text-sm`}`}>{"Xem tranh bảo tàng nghệ thuật"}</span>
            <span className={`font-bold ${size ? `text-sm` : `text-xs`}`}>{"Thưởng thức tranh 3D"}</span>
            {/* <span className={`font-bold ${size ? `text-sm` : `text-xs`}`}>{"Jai-Kwan Kim Kinh nghiệm nghề nghiệp chính"}</span> */}
        </div>
    ),
};

const exhibitButton = {
    KOR: (size)=> (
        <div className={`flex flex-col z-30 ${size ? `space-y-3` : `space-y-2`}`}>
            <span className={`font-bold animate-bounce ${size ? `text-base` : `text-sm`}`}>{"미술관 조형물 보기"}</span>
            <span className={`font-bold ${size ? `text-sm` : `text-xs`}`}>{"3D 조형물 감상"}</span>
        </div>
    ),
    ENG: (size) => (
        <div className={`flex flex-col z-30 ${size ? `space-y-3` : `space-y-2`}`}>
            <span className={`font-bold animate-bounce ${size ? `text-base` : `text-sm`}`}>{"View Art Museum Sculptures"}</span>
            <span className={`font-bold ${size ? `text-sm` : `text-xs`}`}>{"View 3D Sculptures"}</span>
        </div>
    ),
    CH: (size) => (
        <div className={`flex flex-col z-30 ${size ? `space-y-3` : `space-y-2`}`}>
            <span className={`font-bold animate-bounce ${size ? `text-base` : `text-sm`}`}>{"观赏博物馆雕塑"}</span>
            <span className={`font-bold ${size ? `text-sm` : `text-xs`}`}>{"欣赏3D雕塑"}</span>
        </div>
    ),
    TH: (size) => (
        <div className={`flex flex-col z-30 ${size ? `space-y-3` : `space-y-2`}`}>
            <span className={`font-bold animate-bounce ${size ? `text-base` : `text-sm`}`}>{"ชมประติมากรรมของพิพิธภัณฑ์"}</span>
            <span className={`font-bold ${size ? `text-sm` : `text-xs`}`}>{"ชื่นชมประติมากรรม 3 มิติ"}</span>
        </div>
    ),
    VI: (size) => (
        <div className={`flex flex-col z-30 ${size ? `space-y-3` : `space-y-2`}`}>
            <span className={`font-bold animate-bounce ${size ? `text-base` : `text-sm`}`}>{"Xem các tác phẩm điêu khắc của bảo tàng"}</span>
            <span className={`font-bold ${size ? `text-sm` : `text-xs`}`}>{"Đánh giá cao tác phẩm điêu khắc 3D"}</span>
        </div>
    ),
};

const chatbotButton = {
    KOR: (size)=> (
        <div className={`flex flex-col z-30 ${size ? `space-y-3` : `space-y-2`}`}>
            <span className={`font-bold animate-bounce ${size ? `text-base` : `text-sm`}`}>{"챗봇 안내"}</span>
            <span className={`font-bold ${size ? `text-sm` : `text-xs`}`}>{"Chat GPT 채팅 안내 서비스"}</span>
        </div>
    ),
    ENG: (size) => (
        <div className={`flex flex-col z-30 ${size ? `space-y-3` : `space-y-2`}`}>
            <span className={`font-bold animate-bounce ${size ? `text-base` : `text-sm`}`}>{"Chatbot Guide"}</span>
            <span className={`font-bold ${size ? `text-sm` : `text-xs`}`}>{"Chat GPT Chat Guide Service"}</span>
        </div>
    ),
    CH: (size) => (
        <div className={`flex flex-col z-30 ${size ? `space-y-3` : `space-y-2`}`}>
            <span className={`font-bold animate-bounce ${size ? `text-base` : `text-sm`}`}>{"聊天机器人指南"}</span>
            <span className={`font-bold ${size ? `text-sm` : `text-xs`}`}>{"Chat GPT 聊天信息服务"}</span>
        </div>
    ),
    TH: (size) => (
        <div className={`flex flex-col z-30 ${size ? `space-y-3` : `space-y-2`}`}>
            <span className={`font-bold animate-bounce ${size ? `text-base` : `text-sm`}`}>{"คู่มือแชทบอท"}</span>
            <span className={`font-bold ${size ? `text-sm` : `text-xs`}`}>{"บริการข้อมูลแชท GPT แชท"}</span>
        </div>
    ),
    VI: (size) => (
        <div className={`flex flex-col z-30 ${size ? `space-y-3` : `space-y-2`}`}>
            <span className={`font-bold animate-bounce ${size ? `text-base` : `text-sm`}`}>{"Hướng dẫn Chatbot"}</span>
            <span className={`font-bold ${size ? `text-sm` : `text-xs`}`}>{"Trò chuyện Dịch vụ thông tin trò chuyện GPT"}</span>
        </div>
    ),
};

const educationButton = {
    KOR: (size)=> (
        <div className={`flex flex-col ${size ? `space-y-3` : `space-y-2`}`}>
            <span className={`font-bold ${size ? `text-base` : `text-sm`}`}>{"교육 프로그램"}</span>
            <span className={`font-bold ${size ? `text-sm` : `text-xs`}`}>{"교육 프로그램 정보 제공 서비스"}</span>
    </div>
    ),
    ENG: (size) => (
        <div className={`flex flex-col ${size ? `space-y-3` : `space-y-2`}`}>
            <span className={`font-bold ${size ? `text-base` : `text-sm`}`}>{"Education Program"}</span>
            <span className={`font-bold ${size ? `text-sm` : `text-xs`}`}>{"Education Program Information Provision Service"}</span>
    </div>
    ),
    CH: (size) => (
        <div className={`flex flex-col ${size ? `space-y-3` : `space-y-2`}`}>
            <span className={`font-bold ${size ? `text-base` : `text-sm`}`}>{"教育计划"}</span>
            <span className={`font-bold ${size ? `text-sm` : `text-xs`}`}>{"教育项目信息提供服务"}</span>
    </div>
    ),
    TH: (size) => (
        <div className={`flex flex-col ${size ? `space-y-3` : `space-y-2`}`}>
            <span className={`font-bold ${size ? `text-base` : `text-sm`}`}>{"โปรแกรมการศึกษา"}</span>
            <span className={`font-bold ${size ? `text-sm` : `text-xs`}`}>{"บริการจัดหาข้อมูลโปรแกรมการศึกษา"}</span>
    </div>
    ),
    VI: (size) => (
        <div className={`flex flex-col ${size ? `space-y-3` : `space-y-2`}`}>
            <span className={`font-bold ${size ? `text-base` : `text-sm`}`}>{"chương trình giáo dục"}</span>
            <span className={`font-bold ${size ? `text-sm` : `text-xs`}`}>{"Dịch vụ cung cấp thông tin chương trình giáo dục"}</span>
    </div>
    ),
};

const inputCollection = {
    KOR: collection_KOR,
    ENG: collection_ENG,
    CH: collection_CH,
    TH: collection_TH,
    VI: collection_VI,
};

const inputmodelData = {
    KOR: modelData_KOR,
    ENG: modelData_ENG,
    CH: modelData_CH,
    TH: modelData_TH,
    VI: modelData_VI
};

const Button = () => {
    const router = useRouter();
    const {language} = useContext(LanguageContext);
    const {fontsize} = useContext(FontsizeContext);

    return(
        <section className={clsx(
            "md:w-3/4 w-5/6 md:h-2/3 h-[55%] pt-2 px-4 md:pt-8 md:px-14 flex flex-col space-y-5 mx-auto" )}>
                <div className="h-1/2 w-full flex flex-row space-x-5 mx-auto items-end">
                    <div className="md:w-[70%] w-[85%] h-full relative shadow-md rounded-sm mx-auto bg-[url('/img/intro_bg.jpg')] bg-cover bg-no-repeat"
                        onClick={()=>router.push(`/paintings/${inputCollection[language][0].order}?year=${inputCollection[language][0].time}`)}
                    >
                        <div className="absolute inset-0 w-full h-full bg-black opacity-10" />
                        <button className="h-full w-full text-center text-white bg-[url('/img/미술관소개_도형.png')] bg-no-repeat bg-cover mx-auto z-10">
                            {introButton[language](fontsize)}
                        </button>
                    </div>
                    <div className="md:w-[70%] w-[85%] h-full relative shadow-md rounded-sm mx-auto bg-[url('/img/exhibit_bg.jpg')] bg-cover bg-no-repeat"
                        onClick={()=> router.push(`/modelpage/${inputmodelData[language][0].order}`)}
                    >
                        <div className="absolute inset-0 w-full h-full bg-black opacity-10" />
                        <button className="w-full h-full text-center text-white bg-[url('/img/전시안내_도형.png')] bg-cover bg-no-repeat mx-auto z-10">
                            {exhibitButton[language](fontsize)}
                        </button>
                    </div>
                </div>
                <div className="h-1/2 w-full flex flex-row space-x-5 mx-auto items-end">
                    <div className="md:w-[70%] w-[85%] h-full relative shadow-md rounded-sm mx-auto bg-[url('/img/chat_bot_button_2.png')] bg-cover bg-no-repeat"
                        onClick={()=>router.push("https://schema-gpt-final-v1.vercel.app/")}
                    > 
                        <div className="absolute inset-0 w-full h-full bg-black opacity-10" />
                        <button className="w-full h-full text-center text-white bg-[url('/img/챗봇안내_도형.png')] bg-cover bg-no-repeat mx-auto z-10">
                            {chatbotButton[language](fontsize)}
                        </button>
                        </div>
                    <div className="md:w-[70%] w-[85%] h-full relative shadow-md rounded-sm mx-auto bg-[url('/img/education_bg.jpg')] bg-cover bg-repeat"
                    >
                        <div className="absolute inset-0 w-full h-full bg-black opacity-10" />
                        <button className="text-center text-white h-full w-full mx-auto bg-[url('/img/교육프로그램_도형.png')] bg-no-repeat bg-cover z-10">
                            {educationButton[language](fontsize)}
                        </button>
                    </div>
                </div>
     </section>        
    )
};

export default Button;