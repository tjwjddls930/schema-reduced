import Button from "@/components/Button";
import TopNavbar from "@/components/Topnavbar";
import Navbar from "@/components/Navbar";
import { Suspense, useContext, useEffect, useState } from "react";
import { LanguageContext } from "@/contexts/Langaugecontext";
import { FontsizeContext } from "@/contexts/Fontsizecontext";

const topText = {
  KOR: "2023 사립박물관·미술관 디지털 전시관람 환경 개선 지원사업",
  ENG: "2023 Support project to improve digital exhibition viewing environment at private museums and art galleries",
  CH: "2023 支持改善私人博物馆和美术馆的数字展览观看环境的项目",
  TH: "2023 สนับสนุนโครงการปรับปรุงสภาพแวดล้อมในการชมนิทรรศการดิจิทัลที่พิพิธภัณฑ์ส่วนตัวและหอศิลป์",
  VI: "2023 Dự án hỗ trợ cải thiện môi trường xem triển lãm kỹ thuật số tại các bảo tàng và phòng trưng bày nghệ thuật tư nhân"
}

const bottomText = {
  KOR: (size)=> (
      <div className="mx-auto flex flex-row items-center">
          <span className={`text-black ${size ? `text-base` : `text-sm`}`}>{"관람시간 안내"}</span>
          <div className="mx-2 h-[12px] screen-w:h-[24px] w-[0.5px] border border-gray-500">
          </div>
          <span className={`text-black ${size ? `text-base` : `text-sm`}`}>{"오전 10시 ~ 오후 6시"}</span>
          <div className="mx-2 h-[12px] screen-w:h-[24px] w-[0.5px] border border-gray-500">
          </div>
          <span className={`text-black ${size ? `text-base` : `text-sm`}`}>{"오후 5시 30분 입장 마감"}</span>
          <div className="mx-2 h-[12px] screen-w:h-[24px] w-[0.5px] border border-gray-500">
          </div>
          <span className={`text-black ${size ? `text-base` : `text-sm`}`}>{"매주 월요일 휴관"}</span>
      </div>
  ),
  ENG: (size) => (
      <div className="mx-auto flex flex-row items-center">
          <span className={`text-black ${size ? `text-base` : `text-sm`}`}>{"Exhibit time guide"}</span>
          <div className="mx-2 h-[12px] screen-w:h-[24px] w-[0.5px] border border-gray-500">
          </div>
          <span className={`text-black ${size ? `text-base` : `text-sm`}`}>{"10AM ~ 6PM"}</span>
          <div className="mx-2 h-[12px] screen-w:h-[24px] w-[0.5px] border border-gray-500">
          </div>
          <span className={`text-black ${size ? `text-base` : `text-sm`}`}>{"Entry cloeses at 5:30PM"}</span>
          <div className="mx-2 h-[12px] screen-w:h-[24px] w-[0.5px] border border-gray-500">
          </div>
          <span className={`text-black ${size ? `text-base` : `text-sm`}`}>{"Closed every Monday"}</span>
      </div>
  ),
  CH: (size) => (
      <div className="mx-auto flex flex-row items-center">
          <span className={`text-black ${size ? `text-base` : `text-sm`}`}>{"观赏时间信息"}</span>
          <div className="mx-2 h-[12px] w-[0.5px] border border-gray-500">
          </div>
          <span className={`text-black ${size ? `text-base` : `text-sm`}`}>{"上午 10 点至下午 6 点"}</span>
          <div className="mx-2 h-[12px] w-[0.5px] border border-gray-500">
          </div>
          <span className={`text-black ${size ? `text-base` : `text-sm`}`}>{"入场截止时间为下午 5:30"}</span>
          <div className="mx-2 h-[12px] w-[0.5px] border border-gray-500">
          </div>
          <span className={`text-black ${size ? `text-base` : `text-sm`}`}>{"每周一休息"}</span>
      </div>
  ),
  TH: (size) => (
      <div className="mx-auto flex flex-row items-center">
          <span className={`text-black ${size ? `text-base` : `text-sm`}`}>{"ข้อมูลเกี่ยวกับชั่วโมงการรับชม"}</span>
          <div className="mx-2 h-[12px] w-[0.5px] border border-gray-500">
          </div>
          <span className={`text-black ${size ? `text-base` : `text-sm`}`}>{"10.00 - 18.00 น"}</span>
          <div className="mx-2 h-[12px] w-[0.5px] border border-gray-500">
          </div>
          <span className={`text-black ${size ? `text-base` : `text-sm`}`}>{"ปิดรับเข้าเวลา 17.30 น"}</span>
          <div className="mx-2 h-[12px] w-[0.5px] border border-gray-500">
          </div>
          <span className={`text-black ${size ? `text-base` : `text-sm`}`}>{"ปิดทุกวันจันทร์"}</span>
      </div>
  ),
  VI: (size) => (
      <div className="mx-auto flex flex-row items-center">
          <span className={`text-black ${size ? `text-base` : `text-sm`}`}>{"Thông tin về giờ xem"}</span>
          <div className="mx-2 h-[12px] w-[0.5px] border border-gray-500">
          </div>
          <span className={`text-black ${size ? `text-base` : `text-sm`}`}>{"10 giờ sáng - 6 giờ chiều"}</span>
          <div className="mx-2 h-[12px] w-[0.5px] border border-gray-500">
          </div>
          <span className={`text-black ${size ? `text-base` : `text-sm`}`}>{"Cổng vào đóng lúc 5:30 chiều"}</span>
          <div className="mx-2 h-[12px] w-[0.5px] border border-gray-500">
          </div>
          <span className={`text-black ${size ? `text-base` : `text-sm`}`}>{"Đóng cửa vào thứ Hai hàng tuần"}</span>
      </div>
  ),
};

export default function Home() {
  const {language} = useContext(LanguageContext);
  const {fontsize} = useContext(FontsizeContext);
  const [video, setVideo] = useState();
  const [sign, setSign] = useState();

  useEffect(()=>{
    setVideo(`${process.env.NEXT_PUBLIC_CLOUDFLARE_R2_ENDPOINT}/digital-docents/${language}/schema-docent-main-${language}.webm`)
  }, [language]);

  useEffect(()=> {
      setSign(`${process.env.NEXT_PUBLIC_CLOUDFLARE_R2_ENDPOINT}/sign-docents/schema-sign-docent-main-4.webm`)
  }, []);
  return(
    <div className="h-screen w-screen flex flex-col md:items-center md:justify-center">
      <div className="absolute inset-0 bg-cover bg-no-repeat bg-[url('/img/kiosk_main_bg.png')]"
      style={{
          zIndex: -1
      }}
      >
      </div>
      {/* 상단 로고 섹션 */}
      <TopNavbar />
      <div className="w-5/6 h-12 pt-24 pb-4 md:p-0 md:h-auto flex mx-auto text-center items-center justify-center">
          <span className="flex md:text-base text-xs text-gray-700 font-bold">
              {topText[language]}
          </span>
      </div>
      {/* 중단 버튼 섹션 */}
      <Suspense fallback={<>Loading...</>}>
          <Button />
      </Suspense>
      {/* 하단 텍스트 */}
      <div className="hidden md:flex flex-row space-x-4 text-base font-bold pt-4">
          {bottomText[language](fontsize)}
      </div>
      {/* navbar */}
      <Navbar 
          url={video}
          sign={sign}
      /> 
  </div>     
  )
}