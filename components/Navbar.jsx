import { useState, useContext, useEffect } from "react";
import ReactSlider from "react-slider";
import Soundguide from "./Soundguide";
import clsx from "clsx";
import { LanguageContext } from "@/contexts/Langaugecontext";
import { FontsizeContext } from "@/contexts/Fontsizecontext";
import { useRouter } from "next/router";

const languageText = {
  KOR: (func, sound, sign) => (
    <div className="h-full hidden md:flex flex-row space-x-2 w-[150px] md:w-[200px] justify-center items-center text-center">
      <span className="text-sm md:text-lg w-[150px] md:w-[200px] mx-auto font-bold text-Awhite">
        {"언어변경"}
      </span>
      <button
        onClick={func}
        disabled={sound || sign}
        className="rounded-full h-2/3 w-[80px] md:w-[150px] bg-blue-500 text-white font-bold disabled:opacity-50"
      >
        {"KOR"}
      </button>
    </div>
  ),
  ENG: (func, sound, sign) => (
    <div className="h-full hidden md:flex flex-row space-x-2 w-[150px] md:w-[200px] justify-center items-center text-center">
      <span className="text-sm md:text-lg w-[150px] md:w-[450px] mx-auto font-bold text-Awhite mb-1">
        {"Language Change"}
      </span>
      <button
        onClick={func}
        disabled={sound || sign}
        className="rounded-full h-2/3 w-[80px] md:w-[150px] bg-blue-500 text-white font-bold disabled:opacity-50"
      >
        {"ENG"}
      </button>
    </div>
  ),
  CH: (func, sound, sign) => (
    <div className="h-full hidden md:flex flex-row space-x-2 w-[150px] md:w-[200px] justify-center items-center text-center">
      <span className="text-sm md:text-xl w-[150px] md:w-[200px] mx-auto font-bold text-Awhite">
        {"改变语言"}
      </span>
      <button
        onClick={func}
        disabled={sound || sign}
        className="rounded-full h-2/3 w-[80px] md:w-[150px] bg-blue-500 text-white font-bold disabled:opacity-50"
      >
        {"CH"}
      </button>
    </div>
  ),
  TH: (func, sound, sign) => (
    <div className="h-full hidden md:flex flex-row space-x-2 w-[150px] md:w-[200px] justify-center items-center text-center">
      <span className="text-sm md:text-lg w-[150px] md:w-[300px] mx-auto font-bold text-Awhite mb-1">
        {"เปลี่ยนภาษา"}
      </span>
      <button
        onClick={func}
        disabled={sound || sign}
        className="rounded-full h-2/3 w-[80px] md:w-[150px] bg-blue-500 text-white font-bold disabled:opacity-50"
      >
        {"TH"}
      </button>
    </div>
  ),
  VI: (func, sound, sign) => (
    <div className="h-full hidden md:flex flex-row space-x-2 w-[150px] md:w-[200px] justify-center items-center text-center">
      <span className="text-sm md:text-lg w-[150px] md:w-[490px] mx-auto font-bold text-Awhite mb-1">
        {"Thay đổi ngôn ngữ"}
      </span>
      <button
        onClick={func}
        disabled={sound || sign}
        className="rounded-full h-2/3 w-[80px] md:w-[150px] bg-blue-500 text-white font-bold disabled:opacity-50"
      >
        {"VI"}
      </button>
    </div>
  ),
};

const textSize = {
  KOR: (func, size) => (
    <div className="h-full hidden md:flex flex-row space-x-2 w-[140px] md:w-[200px] justify-center text-center items-center">
      <span className="text-sm md:text-lg w-[140px] md:w-[200px] mx-auto font-bold text-white">
        {"글씨크기"}
      </span>
      <button
        onClick={func}
        className="rounded-full text-sm md:text-lg w-[80px] md:w-[150px] h-2/3 bg-blue-500 text-white font-bold"
      >
        {size ? "작게" : "크게"}
      </button>
    </div>
  ),
  ENG: (func, size) => (
    <div className="h-full hidden md:flex flex-row space-x-2 w-[140px] md:w-[200px] justify-center text-center items-center">
      <span className="text-sm md:text-lg w-[140px] md:w-[250px] mx-auto font-bold text-white mb-1">
        {"Font Size"}
      </span>
      <button
        onClick={func}
        className="rounded-full w-[80px] md:w-[150px] h-2/3 bg-blue-500 text-white font-bold"
      >
        {size ? "Small" : "Large"}
      </button>
    </div>
  ),
  CH: (func, size) => (
    <div className="h-full hidden md:flex flex-row space-x-2 w-[140px] md:w-[200px] justify-center text-center items-center">
      <span className="text-sm md:text-lg w-[140px] md:w-[200px] mx-auto font-bold text-white">
        {"字体大小"}
      </span>
      <button
        onClick={func}
        className="rounded-full w-[80px] md:w-[150px] h-2/3 bg-blue-500 text-white font-bold"
      >
        {size ? "小的" : "大的"}
      </button>
    </div>
  ),
  TH: (func, size) => (
    <div className="h-full hidden md:flex flex-row space-x-2 w-[140px] md:w-[200px] justify-center text-center items-center">
      <span className="text-sm md:text-lg w-[140px] md:w-[350px] mx-auto font-bold text-white mb-1">
        {"ขนาดตัวอักษร"}
      </span>
      <button
        onClick={func}
        className="rounded-full w-[80px] md:w-[150px] h-2/3 bg-blue-500 text-white font-bold"
      >
        {size ? "เล็ก" : "ใหญ่"}
      </button>
    </div>
  ),
  VI: (func, size) => (
    <div className="h-full hidden md:flex flex-row space-x-2 w-[140px] md:w-[200px] justify-center text-center items-center">
      <span className="text-sm md:text-lg w-[140px] md:w-[190px] mx-auto font-bold text-white">
        {"Cỡ chữ"}
      </span>
      <button
        onClick={func}
        className="rounded-full w-[80px] md:w-[150px] h-2/3 bg-blue-500 text-white font-bold"
      >
        {size ? "bé nhỏ" : "to lớn"}
      </button>
    </div>
  ),
};

// const volumeControl = {
//   KOR: (func, hide) => (
//     <div className="flex flex-row space-x-2 w-[200px] justify-center text-center items-center">
//       <span className="text-xl w-[200px] mx-auto font-bold text-white">
//         {"볼륨조절"}
//       </span>
//       <button
//         onClick={func}
//         className="rounded-full h-2/3 w-[150px] bg-blue-500 text-white font-bold"
//       >
//         {"조절"}
//       </button>
//     </div>
//   ),
//   ENG: (func, hide) => (
//     <div className={clsx("flex flex-row space-x-2 w-[200px] justify-center text-center items-center")}>
//       <span className="text-xl w-[400px] mx-auto font-bold text-white mb-1">
//         {"Volume Control"}
//       </span>
//       <button
//         onClick={func}
//         className="rounded-full h-2/3 w-[150px] bg-blue-500 text-white font-bold"
//       >
//         {"Control"}
//       </button>
//     </div>
//   ),
//   CH: (func, hide) => (
//     <div className={clsx("flex flex-row space-x-2 w-[200px] justify-center text-center items-center")}>
//       <span className="text-xl w-[200px] mx-auto font-bold text-white">
//         {"音量控制"}
//       </span>
//       <button
//         onClick={func}
//         className="rounded-full h-2/3 w-[150px] bg-blue-500 text-white font-bold"
//       >
//         {"控制"}
//       </button>
//     </div>
//   ),
//   TH: (func, hide) => (
//     <div className={clsx("flex flex-row space-x-2 w-[200px] justify-center text-center items-center")}>
//       <span className="text-xl w-[500px] mx-auto font-bold text-white mb-1">
//         {"การควบคุมระดับเสียง"}
//       </span>
//       <button
//         onClick={func}
//         className="rounded-full h-2/3 w-[150px] bg-blue-500 text-white font-bold"
//       >
//         {"ควบคุม"}
//       </button>
//     </div>
//   ),
//   VI: (func) => (
//     <div className={clsx("flex flex-row space-x-2 w-[200px] justify-center text-center items-center")}>
//       <span className="text-xl w-[500px] mx-auto font-bold text-Awhite">
//         {"Kiểm soát âm lượng"}
//       </span>
//       <button
//         onClick={func}
//         className="rounded-full h-2/3 w-[200px] bg-blue-500 text-white font-bold"
//       >
//         {"điều khiển"}
//       </button>
//     </div>
//   ),
// };

const soundDocent = {
  KOR: (func, sign, sound, hide) => (
    <div className={clsx("h-full flex-row space-x-2 w-[150px] md:w-[200px] justify-center text-center items-center", hide ? "hidden" : "flex")}>
      <span className="text-sm md:text-lg w-[150px] md:w-[200px] mx-auto font-bold text-white">
        {"음성안내"}
      </span>
      <button
        onClick={func}
        className="rounded-full h-2/3 w-[80px] md:w-[150px] text-sm md:text-lg bg-blue-500 text-white font-bold disabled:opacity-50 animate-pulse"
        disabled={sign}
      >
        {sound ? "정지" : "시작"}
      </button>
    </div>
  ),
  ENG: (func, sign, sound, hide) => (
    <div className={clsx("h-full flex-row space-x-2 w-[150px] md:w-[200px] justify-center text-center items-center", hide ? "hidden" : "flex")}>
      <span className="text-sm md:text-lg w-[150px] md:w-[350px] mx-auto font-bold text-white mb-1">
        {"Sound Guide"}
      </span>
      <button
        onClick={func}
        className="rounded-full h-2/3 w-[80px] md:w-[150px] text-sm md:text-lg bg-blue-500 text-white font-bold disabled:opacity-50 animate-pulse"
        disabled={sign}
      >
        {sound ? "Stop" : "Start"}
      </button>
    </div>
  ),
  CH: (func, sign, sound, hide) => (
    <div className={clsx("h-full flex-row space-x-2 w-[150px] md:w-[200px] justify-center text-center items-center", hide ? "hidden" : "flex")}>
      <span className="text-sm md:text-lg w-[150px] md:w-[200px] mx-auto font-bold text-white">
        {"语音指导"}
      </span>
      <button
        onClick={func}
        className="rounded-full h-2/3 w-[80px] md:w-[150px] text-sm md:text-lg bg-blue-500 text-white font-bold disabled:opacity-50 animate-pulse"
        disabled={sign}
      >
        {sound ? "停止" : "开始"}
      </button>
    </div>
  ),
  TH: (func, sign, sound, hide) => (
    <div className={clsx("h-full flex-row space-x-2 w-[150px] md:w-[200px] justify-center text-center items-center", hide ? "hidden" : "flex")}>
      <span className="text-sm md:text-lg w-[150px] md:w-[450px] mx-auto font-bold text-white mb-1">
        {"คำแนะนำด้วยเสียง"}
      </span>
      <button
        onClick={func}
        className="rounded-full h-2/3 w-[80px] md:w-[150px] text-sm md:text-lg bg-blue-500 text-white font-bold disabled:opacity-50 animate-pulse"
        disabled={sign}
      >
        {sound ? "หยุด" : "เริ่ม"}
      </button>
    </div>
  ),
  VI: (func, sign, sound, hide) => (
    <div className={clsx("h-full flex-row space-x-2 w-[170px] md:w-[200px] justify-center text-center items-center", hide ? "hidden" : "flex")}>
      <span className="text-sm md:text-lg w-[170px] md:w-[690px] mx-auto font-bold text-white">
        {"hướng dẫn bằng giọng nói"}
      </span>
      <button
        onClick={func}
        className="rounded-full h-2/3 w-[100px] md:w-[150px] text-sm md:text-lg bg-blue-500 text-white font-bold disabled:opacity-50 animate-pulse"
        disabled={sign}
      >
        {sound ? "dừng lại" : "bắt đầu"}
      </button>
    </div>
  ),
};

const signDocent = {
  KOR: (func, sound, sign, hide) => (
    <div className={clsx("h-full flex-row space-x-2 w-[150px] md:w-[200px] justify-center text-center items-center", hide ? "hidden" : "flex")}>
      <span className="text-sm md:text-lg w-[150px] md:w-[200px] mx-auto font-bold text-white">
        {"수어안내"}
      </span>
      <button
        className="rounded-full h-2/3 w-[80px] md:w-[150px] text-sm md:text-lg bg-blue-500 text-white font-bold disabled:opacity-50 animate-pulse"
        onClick={func}
        disabled={sound}
      >
        {sign ? "정지" : "시작"}
      </button>
    </div>
  ),
  ENG: (func, sound, sign, hide) => (
    <div className={clsx("h-full flex-row space-x-2 w-[200px] md:w-[200px] justify-center text-center items-center", hide ? "hidden" : "flex")}>
      <span className="text-sm md:text-lg w-[200px] md:w-[500px] mx-auto font-bold text-white mb-1">
        {"Sign Language Guide"}
      </span>
      <button
        onClick={func}
        className="rounded-full h-2/3 w-[80px] md:w-[150px] text-sm md:text-lg bg-blue-500 text-white font-bold disabled:opacity-50 animate-pulse"
        disabled={sound}
      >
        {sign ? "Stop" : "Start"}
      </button>
    </div>
  ),
  CH: (func, sound, sign, hide) => (
    <div className={clsx("h-full flex-row space-x-2 w-[150px] md:w-[200px] justify-center text-center items-center", hide ? "hidden" : "flex")}>
      <span className="text-sm md:text-lg w-[150px] md:w-[200px] mx-auto font-bold text-white">
        {"手语指南"}
      </span>
      <button
        onClick={func}
        className="rounded-full h-2/3 w-[80px] md:w-[150px] text-sm md:text-lg bg-blue-500 text-white font-bold disabled:opacity-50 animate-pulse"
        disabled={sound}
      >
        {sign ? "停止" : "开始"}
      </button>
    </div>
  ),
  TH: (func, sound, sign, hide) => (
    <div className={clsx("h-full flex-row space-x-2 w-[150px] md:w-[200px] justify-center text-center items-center", hide ? "hidden" : "flex")}>
      <span className="text-sm md:text-lg w-[150px] md:w-[300px] mx-auto font-bold text-white mb-1">
        {"คู่มือภาษามือ"}
      </span>
      <button
        onClick={func}
        className="rounded-full h-2/3 w-[80px] md:w-[150px] text-sm md:text-lg bg-blue-500 text-white font-bold disabled:opacity-50 animate-pulse"
        disabled={sound}
      >
        {sign ? "หยุด" : "เริ่ม"}
      </button>
    </div>
  ),
  VI: (func, sound, sign, hide) => (
    <div className={clsx("h-full flex-row space-x-2 w-[200px] md:w-[200px] justify-center text-center items-center", hide ? "hidden" : "flex")}>
      <span className="text-sm md:text-lg w-[200px] md:w-[740px] mx-auto font-bold text-white">
        {"Hướng dẫn ngôn ngữ ký hiệu"}
      </span>
      <button
        onClick={func}
        className="rounded-full h-2/3 w-[100px] md:w-[150px] text-sm md:text-lg bg-blue-500 text-white font-bold disabled:opacity-50 animate-pulse"
        disabled={sound}
      >
        {sign ? "dừng lại" : "bắt đầu"}
      </button>
    </div>
  ),
};

const languageChange = {
  KOR: (size) => (
      <span className={`text-sm md:text-base font-bold pt-2`}>{"언어 변경"}</span>
  ),
  ENG: (size) => (
      <span className={`text-sm md:text-base font-bold pt-2`}>{"Language Change"}</span>
  ),
  CH: (size) => (
      <span className={`text-sm md:text-base font-bold pt-2`}>{"改变语言"}</span>
  ),
  TH: (size) => (
      <span className={`text-sm md:text-base font-bold pt-2`}>{"เปลี่ยนภาษา"}</span>
  ),
  VI: (size) => (
      <span className={`text-sm md:text-base font-bold pt-2`}>{"thay đổi ngôn ngữ"}</span>
  ),
};

const Navbar = ({ url, sign }) => {
  const router = useRouter();
  // const [volume, setVolume] = useState(Number(0.5));
  const [volumepop, setVolumepop] = useState(false);
  const [soundguide, setSoundguide] = useState(false);
  const [signLang, setsignLang] = useState(false);
  const [modal, setModal] = useState(false);
  const [docent, setDocent] = useState(false);
  const [signbutton, setsignButton] = useState(false);
  const { language, setLanguage } = useContext(LanguageContext);
  const { fontsize, setFontsize } = useContext(FontsizeContext);

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  useEffect(()=> {
    if(!url) {
      setDocent(true);
    } else {
      setDocent(false);
    }
  }, [url]);

  useEffect(()=> {
    if(!sign) {
      setsignButton(true);
    } else {
      setsignButton(false);
    }
  }, [sign])

  // console.log(url);
  return (
    <>
      {soundguide && (
        <div
          className={clsx("absolute top-0 left-0 h-[91.5%] w-screen bg-black bg-opacity-60 z-20")}
          onClick={() => {
            setSoundguide(!soundguide)
          }}
        >
          <div
            className={clsx("absolute transform -translate-x-1/2 left-1/2 bottom-0 h-2/3 w-3/4 z-40")}
            onClick={() => {
              setSoundguide(!soundguide)
            }}
          >
            <Soundguide
              videoUrl={url}
              // volume={Number(volume)}
              volume={1}
              playing={true}
              loop={false}
              end={() => {
                setSoundguide(!soundguide)
              }}
            />
          </div>
        </div>
      )}
      {signLang && (
        <div
        className={clsx("absolute top-0 left-0 h-[91.5%] w-screen bg-black bg-opacity-60 z-20")}
        onClick={() => {
          setsignLang(!signLang)
        }}
      >
        <div
          className={clsx("absolute transform -translate-x-1/2 left-1/2 bottom-0 h-2/3 w-3/4 z-40")}
          onClick={() => {
            setsignLang(!signLang)
          }}
        >
          <Soundguide
            videoUrl={sign}
            volume={0}
            playing={true}
            loop={false}
            end={() => setsignLang(!signLang)}
          />
        </div>
      </div>
      )}
      {/* {volumepop && (
        <div className="absolute h-8 w-[250px] bottom-24 right-96 rounded-full bg-black bg-opacity-60 items-center z-30">
          <ReactSlider
            step={0.01}
            min={0}
            max={1}
            className="w-[180px] h-3 bg-Awhite rounded-full cursor-grab mt-2 mx-auto"
            thumbClassName="absolute w-5 h-5 cursor-grab bg-blue-800 rounded-full border-2 border-white -top-1"
            trackClassName="top-0 bottom-0 bg-white bg-purple-500"
            renderTrack={(props, state) => (
              <div
                {...props}
                className={clsx(
                  "h-3 rounded-full cursor-pointer",
                  {
                    "bg-white": state.index === 1,
                    "bg-blue-800": state.index === 0,
                  }
                )}
              ></div>
            )}
            value={volume}
            onChange={(value) => setVolume(value)}
            onAfterChange={()=> setTimeout(()=> {
              setVolumepop(!volumepop)
            }, 3000)}
          />
        </div>
      )} */}
      {/* 언어변경 버튼 */}
      <button 
          className={clsx(`md:hidden absolute transform -translate-x-1/2 left-1/2 bottom-12 text-black space-y-4`)}
          onClick={()=>setModal(!modal)}    
      >
          <div className="flex flex-col">
              <div className="border-2 border-blue-800 rounded-full w-12 h-12 items-center bg-white mx-auto">
                  <img 
                    className="h-8 w-8 mx-auto pt-2.5 z-1"
                    src="/img/언어변경_아이콘_1.png"
                    alt="language"
                  />
              </div>
              {languageChange[language](fontsize)}
          </div>
      </button>
      {modal && (
        <div className="absolute top-0 h-screen w-screen bg-opacity-60 bg-black z-10">
          <div
            className={clsx("flex flex-col h-2/3 w-[90%] md:h-[80%] md:w-3/4 items-center mx-auto bg-white rounded-lg z-20 mt-8 md:mt-20 space-y-4")}
          >
            <span className="text-xl text-black font-bold mt-4">
              여러분의 언어를 선택해주세요!
            </span>
            <span className="text-lg text-black font-bold">
              Please select your language
            </span>
            <div
              className={clsx("flex flex-col space-y-10 md:space-y-6 w-full h-[800px] bg-blue-800 bg-opacity-30 rounded-b-lg py-10 md:py-6 items-end z-30")}
            >
              <div className="flex flex-row mx-auto space-x-4 md:space-x-6 z-40">
                {/* 한국어 */}
                <button className="h-[110px] w-[100px] md:h-[150px] md:w-[250px] z-40 bg-white shadow-lg rounded-lg focus:bg-blue-800 text-black focus:text-white">
                  <div
                    id="ko"
                    className="flex h-full w-full items-center"
                    onClick={() => changeLanguage("KOR")}
                  >
                    <div className="h-1/2 w-full flex flex-col text-center space-y-4">
                      <span className="text-base md:text-xl font-bold z-40">
                        한국어
                      </span>
                      <span className="text-sm md:text-lg font-bold z-40">
                        Korean
                      </span>
                    </div>
                  </div>
                </button>
                {/* 영어 */}
                <button className="h-[110px] w-[100px] md:h-[150px] md:w-[250px] z-40 bg-white shadow-lg rounded-lg focus:bg-blue-800 text-black focus:text-white">
                  <div
                    id="en"
                    className="flex h-full w-full items-center"
                    onClick={() => changeLanguage("ENG")}
                  >
                    <div className="h-1/2 w-full flex flex-col text-center space-y-4">
                      <span className="text-base md:text-xl font-bold">
                        English
                      </span>
                      <span className="text-sm md:text-lg font-bold">
                        English
                      </span>
                    </div>
                  </div>
                </button>
              </div>
              <div className="flex flex-row mx-auto space-x-4 md:space-x-6 z-40">
                {/* 중국어 */}
                <button className="h-[110px] w-[100px] md:h-[150px] md:w-[250px] z-40 bg-white shadow-lg rounded-lg focus:bg-blue-800 text-black focus:text-white">
                  <div
                    id="zh"
                    className="flex h-full w-full items-center"
                    onClick={() => changeLanguage("CH")}
                  >
                    <div className="h-1/2 w-full flex flex-col text-center space-y-4">
                      <span className="text-base md:text-xl font-bold z-40">
                        中國語
                      </span>
                      <span className="text-sm md:text-lg font-bold z-40">
                        Chinese
                      </span>
                    </div>
                  </div>
                </button>
                {/* 태국어 */}
                <button className="h-[110px] w-[100px] md:h-[150px] md:w-[250px] z-40 bg-white shadow-lg rounded-lg focus:bg-blue-800 text-black focus:text-white">
                  <div
                    id="th"
                    className="flex h-full w-full items-center"
                    onClick={() => changeLanguage("TH")}
                  >
                    <div className="h-1/2 w-full flex flex-col text-center space-y-4">
                      <span className="text-base md:text-xl font-bold">
                        แบบไทย
                      </span>
                      <span className="text-sm md:text-lg font-bold">
                        Thai
                      </span>
                    </div>
                  </div>
                </button>
                {/* 베트남어 */}
                <button className="h-[110px] w-[100px] md:h-[150px] md:w-[250px] z-40 bg-white shadow-lg rounded-lg focus:bg-blue-800 text-black focus:text-white">
                  <div
                    id="vi"
                    className="flex h-full w-full items-center"
                    onClick={() => changeLanguage("VI")}
                  >
                    <div className="h-1/2 w-full flex flex-col text-center space-y-4">
                      <span className="text-base md:text-xl font-bold">
                        Tiếng Việt
                      </span>
                      <span className="text-sm md:text-lg font-bold">
                        Vietnamese
                      </span>
                    </div>
                  </div>
                </button>
              </div>
              <div className="flex flex-row mx-auto space-x-6 z-40">
                <button
                  className="h-12 w-[150px] md:w-[200px] z-40 bg-white shadow-lg rounded-full text-black font-bold text-base md:text-xl"
                  onClick={() => setModal(!modal)}
                >
                  취소하기
                </button>
                {/* 언어 변경 버튼 */}
                <button
                  className="h-12 w-[150px] md:w-[200px] z-40 bg-gradient-to-r from-blue-800 to-blue-500 shadow-lg rounded-full text-white font-bold text-base md:text-xl"
                  onClick={() => setModal(!modal)}
                >
                  언어 변경하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <nav className={clsx("fixed lg:flex bottom-0 w-screen h-12 md:h-16 bg-blue-800 px-4 md:px-10 items-center")}>
        <div className="flex flex-row w-full h-full space-x-4 justify-end">
          {languageText[language](() => setModal(!modal), soundguide, signLang)}
          {textSize[language](() => setFontsize(!fontsize), fontsize)}
          {/* {volumeControl[language](() => setVolumepop(!volumepop), docent)} */}
          {signDocent[language](
            () => setsignLang(!signLang),
            soundguide,
            signLang,
            signbutton
          )}
          {soundDocent[language](
            () => setSoundguide(!soundguide),
            signLang,
            soundguide,
            docent
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
