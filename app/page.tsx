"use client";

import { useState } from "react";

type Screen =
  | "start"
  | "story1"
  | "story2"
  | "story3"
  | "story4"
  | "story5"
  | "home"
  | "characters"
  | "master"
  | "aqing"
  | "chenapo"
  | "zhang"
  | "notebook"
  | "craftNotebook"
  | "puzzle";

  export default function Home() {
  
    type MasterMessage = {
      role: "user" | "assistant";
      text: string;
    };
  
    const [masterMessages, setMasterMessages] = useState<MasterMessage[]>([
      {
        role: "assistant",
        text: "纹从竹来，理从竹性来。想补遗纹，先把竹问明白。",
      },
    ]);
  
    const [masterInput, setMasterInput] = useState("");
    const [masterAiLoading, setMasterAiLoading] = useState(false);
  
    type AqingMessage = {
      role: "user" | "assistant";
      text: string;
    };
    
    const [aqingChatOpen, setAqingChatOpen] = useState(false);
    
    const [aqingMessages, setAqingMessages] = useState<AqingMessage[]>([
      {
        role: "assistant",
        text: "竹纹不是只能照旧样复刻。先看懂它为什么这样编，再谈怎么重新设计。",
      },
    ]);
    const [chenapoIntroOpen, setChenapoIntroOpen] = useState(false);
const [chenapoChatOpen, setChenapoChatOpen] = useState(false);

type ChenapoMessage = {
  role: "user" | "assistant";
  text: string;
};

const [chenapoMessages, setChenapoMessages] = useState<ChenapoMessage[]>([
  {
    role: "assistant",
    text: "竹纹不只在手上，也在日子里。想知道纹样为什么这样传下来，就得先听听村里的故事。",
  },
]);

const [chenapoInput, setChenapoInput] = useState("");
const [chenapoAiLoading, setChenapoAiLoading] = useState(false);
const [chenapoSuggestionGroup, setChenapoSuggestionGroup] = useState(0);

    
    const [aqingInput, setAqingInput] = useState("");
    const [aqingAiLoading, setAqingAiLoading] = useState(false);
    const [aqingSuggestionGroup, setAqingSuggestionGroup] = useState(0);
    // 下面继续你原来的其他状态和函数
type ZhangMessage = {
      role: "user" | "assistant";
      text: string;
    };
    
    const [zhangIntroOpen, setZhangIntroOpen] = useState(false);
    const [zhangChatOpen, setZhangChatOpen] = useState(false);
    
    const [zhangMessages, setZhangMessages] = useState<ZhangMessage[]>([
      {
        role: "assistant",
        text: "传统当然重要，但如果没人愿意看，再好的纹样也走不出去。展陈首先要让人停下来。",
      },
    ]);
    
    const [zhangInput, setZhangInput] = useState("");
    const [zhangAiLoading, setZhangAiLoading] = useState(false);
    const [zhangSuggestionGroup, setZhangSuggestionGroup] = useState(0);


  const [screen, setScreen] = useState<Screen>("start");

  const [activeWorkshopItem, setActiveWorkshopItem] = useState<string | null>(null);
  const [scrollOpening, setScrollOpening] = useState(false);
  const [masterIntroOpen, setMasterIntroOpen] = useState(false);
  const [aqingIntroOpen, setAqingIntroOpen] = useState(false);
  const [masterChatOpen, setMasterChatOpen] = useState(false);
  const [masterChatStep, setMasterChatStep] = useState<
  "idle" | "question" | "thinking" | "answer"
>("idle"); 
  const [showPuzzleQuestion, setShowPuzzleQuestion] = useState(false);
  const [firstFragmentUnlocked, setFirstFragmentUnlocked] = useState(false);
  const [firstFragmentPlaced, setFirstFragmentPlaced] = useState(false);
  const [selectedPuzzleAnswer, setSelectedPuzzleAnswer] = useState<string | null>(null);
  const [answerResult, setAnswerResult] = useState<"idle" | "correct" | "wrong">("idle");
  const [draggingFragment, setDraggingFragment] = useState(false);
  const [masterSuggestionGroup, setMasterSuggestionGroup] = useState(0);

  function openFirstPuzzleQuestion() {
    if (firstFragmentPlaced) return;
    setSelectedPuzzleAnswer(null);
    setAnswerResult("idle");
    setShowPuzzleQuestion(true);
  }
  
  function submitPuzzleAnswer() {
    if (!selectedPuzzleAnswer) return;
  
    if (selectedPuzzleAnswer === "a") {
      setAnswerResult("correct");
      setTimeout(() => {
        setFirstFragmentUnlocked(true);
        setShowPuzzleQuestion(false);
      }, 500);
    } else {
      setAnswerResult("wrong");
    }
  }
  
  function resetPuzzleProgress() {
    setShowPuzzleQuestion(false);
    setFirstFragmentUnlocked(false);
    setFirstFragmentPlaced(false);
    setSelectedPuzzleAnswer(null);
    setAnswerResult("idle");
    setDraggingFragment(false);
  }
  
  function handleFragmentDragStart(e: React.DragEvent<HTMLDivElement>) {
    e.dataTransfer.setData("text/plain", "fragment-1");
    e.dataTransfer.effectAllowed = "move";
    setDraggingFragment(true);
  }
  
  function handleFragmentDragEnd() {
    setDraggingFragment(false);
  }
  
  function handleFragmentDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
  
    if (data === "fragment-1" && firstFragmentUnlocked) {
      setFirstFragmentPlaced(true);
      setDraggingFragment(false);
    }
  }

  function openStoryScroll() {
    if (scrollOpening) return;
  
    setScrollOpening(true);
  
    setTimeout(() => {
      setScreen("story2");
      setScrollOpening(false);
    }, 1600);
  }

  // 假 AI 状态
  const [askedMasterQuestion, setAskedMasterQuestion] = useState(false);
  const [masterReplyReady, setMasterReplyReady] = useState(false);

  // 游戏状态
  const [materialClueUnlocked, setMaterialClueUnlocked] = useState(false);
  const [showCluePopup, setShowCluePopup] = useState(false);

  const masterProgress = materialClueUnlocked ? 1 : 0;

  function askMasterQuestion() {
    if (askedMasterQuestion) return;

    setAskedMasterQuestion(true);

    // 模拟 AI 思考
    setTimeout(() => {
      setMasterReplyReady(true);
      setMaterialClueUnlocked(true);
      setShowCluePopup(true);
    }, 900);
  }
  const handleWorkshopEnter = (
    nextScreen: Screen,
    item: "wenzhu" | "xiwen" | "buyi"
  ) => {
    setActiveWorkshopItem(item);
  
    setTimeout(() => {
      setActiveWorkshopItem(null);
      setScreen(nextScreen);
    }, 180);
  };
  
  async function sendMasterMessage() {
    const text = masterInput.trim();
  
    if (!text || masterAiLoading) return;
  
    // 先显示玩家消息
    setMasterMessages((prev) => [
      ...prev,
      {
        role: "user",
        text,
      },
    ]);

    setMasterSuggestionGroup((prev) => Math.min(prev + 1, 2));
    setMasterInput("");
    setMasterAiLoading(true);
  
    try {
      const response = await fetch("/api/master-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "请求失败");
      }
  
      // 显示老竹师回复
      setMasterMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.reply,
        },
      ]);
  
      // 检测是否触发“顺时取竹”材料线索
      const materialClueKeywords = [
        "顺时取竹",
        "采竹时节",
        "取材时节",
        "材性更稳定",
      ];
  
      const foundMaterialClue = materialClueKeywords.some((keyword) =>
        data.reply.includes(keyword)
      );
  
      if (foundMaterialClue && !materialClueUnlocked) {
        setMaterialClueUnlocked(true);
  
        setTimeout(() => {
          setShowCluePopup(true);
        }, 700);
      }
    } catch (error) {
      console.error("老竹师 AI 请求失败：", error);
  
      setMasterMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "竹篾还未理顺，稍后再问我吧。",
        },
      ]);
    } finally {
      setMasterAiLoading(false);
    }
  }
  async function sendAqingMessage() {
    const text = aqingInput.trim();
  
    if (!text || aqingAiLoading) return;
  
    setAqingMessages((prev) => [
      ...prev,
      {
        role: "user",
        text,
      },
    ]);
  
    setAqingInput("");
    setAqingAiLoading(true);
  
    try {
      const response = await fetch("/api/aqing-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "请求失败");
      }
  
      setAqingMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.reply,
        },
      ]);
  
      setAqingSuggestionGroup((prev) => Math.min(prev + 1, 2));
    } catch (error) {
      console.error("阿青 AI 请求失败：", error);
  
      setAqingMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "这个纹样我还想再理一理，你稍后再问我吧。",
        },
      ]);
    } finally {
      setAqingAiLoading(false);
    }
  }
  async function sendChenapoMessage() {
    const text = chenapoInput.trim();
  
    if (!text || chenapoAiLoading) return;
  
    setChenapoMessages((prev) => [
      ...prev,
      {
        role: "user",
        text,
      },
    ]);
  
    setChenapoInput("");
    setChenapoAiLoading(true);
  
    try {
      const response = await fetch("/api/chenapo-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "请求失败");
      }
  
      setChenapoMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.reply,
        },
      ]);
  
      setChenapoSuggestionGroup((prev) =>
        Math.min(prev + 1, 2)
      );
    } catch (error) {
      console.error("陈阿婆 AI 请求失败：", error);
  
      setChenapoMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "这竹篾还没理顺，阿婆待会儿再和你说。",
        },
      ]);
    } finally {
      setChenapoAiLoading(false);
    }
  }
  async function sendZhangMessage() {
    const text = zhangInput.trim();
  
    if (!text || zhangAiLoading) return;
  
    setZhangMessages((prev) => [
      ...prev,
      {
        role: "user",
        text,
      },
    ]);
  
    setZhangInput("");
    setZhangAiLoading(true);
  
    try {
      const response = await fetch("/api/zhang-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "请求失败");
      }
  
      setZhangMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.reply,
        },
      ]);
  
      setZhangSuggestionGroup((prev) =>
        Math.min(prev + 1, 2)
      );
    } catch (error) {
      console.error("张策展人 AI 请求失败：", error);
  
      setZhangMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "这个展陈思路我还得再权衡一下，你稍后再问。",
        },
      ]);
    } finally {
      setZhangAiLoading(false);
    }
  }

  return (
    <main className="game-shell">
      {/* =========================
          01 启动页
      ========================== */}
     {screen === "start" && (
  <section
    className="screen start-screen start-image-screen"
    onClick={() => setScreen("story1")}
  >
    <img
      src="/start.png"
      alt="玩竹工坊·遗纹谜 启动页"
      className="start-full-image"
    />
  </section>
)}

      {/* =========================
          02 剧情页 1
      ========================== */}
     {screen === "story1" && (
  <section className="screen scroll-opening-screen">

    {/* 展开以后首先看到的剧情页 */}
    <img
      src="/story2.png"
      alt="剧情第一页"
      className="scroll-reveal-story"
    />

    {/* 左半卷轴 */}
    <div
      className={`scroll-half scroll-left ${
        scrollOpening ? "opening" : ""
      }`}
    >
      <img
        src="/story1.png"
        alt=""
        className="scroll-cover-image"
      />
    </div>

    {/* 右半卷轴 */}
    <div
      className={`scroll-half scroll-right ${
        scrollOpening ? "opening" : ""
      }`}
    >
      <img
        src="/story1.png"
        alt=""
        className="scroll-cover-image"
      />
    </div>
    {scrollOpening && (
  <div className="scroll-light" />
)}

    {/* 中央点击阅读热区 */}
    {!scrollOpening && (
      <button
        className="scroll-open-button"
        onClick={openStoryScroll}
        aria-label="点击阅读"
      />
    )}

  </section>
)}
         
      {/* =========================
          03 剧情页 2
      ========================== */}
    {/* =========================
    story2
========================== */}
{screen === "story2" && (
  <section className="screen image-story-screen">
    <img
      src="/story2-bg.png"
      alt=""
      className="story-full-image"
    />

    <img
      src="/story2-person.png"
      alt=""
      className="story2-person floating-person"
    />

    <button
      className="story-next-hotspot"
      onClick={() => setScreen("story3")}
      aria-label="下一页"
    />
  </section>
)}
{/* =========================
    story3
========================== */}
{screen === "story3" && (
  <section className="screen image-story-screen">
    <img
      src="/story3-bg.png"
      alt=""
      className="story-full-image"
    />

    <img
      src="/story3-pieces.png"
      alt=""
      className="story3-pieces floating-pieces"
    />

    <button
      className="story-next-hotspot"
      onClick={() => setScreen("story4")}
      aria-label="下一页"
    />
  </section>
)}

{/* =========================
    story4
========================== */}
{screen === "story4" && (
  <section className="screen image-story-screen">
    <img
      src="/story4-bg.png"
      alt=""
      className="story-full-image"
    />

    <img
      src="/story4-people.png"
      alt=""
      className="story4-people"
    />

    <button
      className="story-next-hotspot"
      onClick={() => setScreen("story5")}
      aria-label="下一页"
    />
  </section>
)}
{/* =========================
    story5
========================== */}
{screen === "story5" && (
  <section className="screen image-story-screen">
    <img
      src="/story5.png"
      alt="剧情最终页"
      className="story-full-image"
    />

    <button
      className="story-start-task-hotspot"
      onClick={() => setScreen("home")}
      aria-label="开启任务"
    />
  </section>
)}
      {/* =========================
          05 玩竹工坊首页
      ========================== */}
{screen === "home" && (
  <section className="screen workshop-home">
    <img
      src="/workshop-bg.png"
      alt="玩竹工坊"
      className="workshop-bg"
    />

    <button
      className="workshop-home-button"
      onClick={() => setScreen("start")}
      aria-label="返回启动页"
    />

    <button
      className="workshop-icon-button workshop-icon-wenzhu"
      onClick={() => handleWorkshopEnter("characters", "wenzhu")}
      aria-label="进入问竹"
    >
      <img src="/wenzhu-icon.png" alt="" />
    </button>

    <button
      className="workshop-icon-button workshop-icon-xiwen"
      onClick={() => handleWorkshopEnter("notebook", "xiwen")}
      aria-label="进入习纹"
    >
      <img src="/xiwen-icon.png" alt="" />
    </button>

    <button
      className="workshop-icon-button workshop-icon-buyi"
      onClick={() => handleWorkshopEnter("puzzle", "buyi")}
      aria-label="进入补谱"
    >
      <img src="/buyi-icon.png" alt="" />
    </button>
  </section>
)}
      {/* =========================
          06 坊内问学
      ========================== */}
     {screen === "characters" && (
  <section className="screen character-image-screen">
    {/* 原始背景，最好是不带人物的版本 */}
    <img
      src="/wenxueshouye-bg.png"
      alt="问竹·坊内问学"
      className="character-page-bg"
    />

    {/* 返回 */}
    <button
      className="character-back-hotspot"
      onClick={() => setScreen("home")}
      aria-label="返回玩竹工坊"
    />

    {/* 老竹师 */}
    <button
      className="character-layer character-laozhushi"
      onClick={() => setScreen("master")}
      aria-label="老竹师"
    >
      <img src="/laozhushi.png" alt="" />
    </button>

    {/* 阿青 */}
    <button
  className="character-layer character-aqing"
  onClick={() => setScreen("aqing")}
  aria-label="阿青"
>
  <img src="/aqing.png" alt="" />
</button>

    {/* 陈阿婆 */}
    <button
  className="character-layer character-chenapo"
  onClick={() => setScreen("chenapo")}
  aria-label="陈阿婆"
>
  <img src="/chenapo.png" alt="" />
</button>

    {/* 张策展人 */}
    <button
  className="character-layer character-zhang"
  onClick={() => setScreen("zhang")}
  aria-label="张策展人"
>
  <img src="/zhangcezhanren.png" alt="" />
</button>
  </section>
)}
    
     {/* =========================
    07 老竹师假 AI
========================= */}
{screen === "master" && (
  <section className="screen master-entry-screen">

    {/* 还没进入正式对话 */}
    {!masterChatOpen && (
      <>
        <img
          src={
            masterIntroOpen
              ? "/master-intro.png"
              : "/master-home.png"
          }
          alt="老竹师"
          className="master-entry-bg"
        />

        <button
          className="master-entry-back"
          onClick={() => {
            setMasterIntroOpen(false);
            setMasterChatOpen(false);
            setScreen("characters");
          }}
          aria-label="返回坊内问学"
        />

        <button
          className="master-intro-button"
          onClick={() => setMasterIntroOpen(true)}
          aria-label="人物介绍"
        />

        <button
          className="master-chat-button"
          onClick={() => setMasterChatOpen(true)}
          aria-label="开启问话"
        />

        {!masterIntroOpen && (
          <img
            src="/guide-intro-hand.png"
            alt=""
            className="master-full-guide"
          />
        )}

        {masterIntroOpen && (
          <img
            src="/guide-chat-hand.png"
            alt=""
            className="master-full-guide"
          />
        )}
      </>
    )}

    {/* 正式进入老竹师对话 */}
    {masterChatOpen && (
  <>
    {/* 对话页背景 */}
    <img
  src="/master-chat-bg.png"
  alt="老竹师对话"
  className="master-entry-bg"
/>

    {/* 返回 */}
    <button
      className="master-entry-back"
      onClick={() => {
        setMasterChatOpen(false);
      }}
      aria-label="返回"
    />

    {/* AI 对话区 */}
    <div className="master-ai-chat-panel">
      <div className="master-ai-messages">
        {masterMessages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.role === "assistant"
                ? "master-message master-message-ai"
                : "master-message master-message-user"
            }
          >
            {msg.text}
          </div>
        ))}

        {masterAiLoading && (
          <div className="master-message master-message-ai master-thinking">
            老竹师正在整理竹篾……
          </div>
        )}
      </div>
     <div className="master-suggested-questions">
  {masterSuggestionGroup === 0 && (
    <>
      <button
        onClick={() => {
          setMasterInput("为什么采竹要挑时间？");
        }}
      >
        为什么采竹要挑时间？
      </button>

      <button
        onClick={() => {
          setMasterInput("什么样的竹子更适合做竹编？");
          setMasterSuggestionGroup(1);
        }}
      >
        什么样的竹子更适合做竹编？
      </button>

      <button
        onClick={() => {
          setMasterInput("竹篾为什么要顺着竹性处理？");
          setMasterSuggestionGroup(1);
        }}
      >
        竹篾为什么要顺着竹性处理？
      </button>
    </>
  )}

  {masterSuggestionGroup === 1 && (
    <>
      <button
        onClick={() => {
          setMasterInput("竹子采回来以后第一步要做什么？");
          setMasterSuggestionGroup(2);
        }}
      >
        竹子采回来以后第一步要做什么？
      </button>

      <button
        onClick={() => {
          setMasterInput("起篾时为什么要顺着竹纤维？");
          setMasterSuggestionGroup(2);
        }}
      >
        起篾时为什么要顺着竹纤维？
      </button>

      <button
        onClick={() => {
          setMasterInput("竹材太湿会影响编织吗？");
          setMasterSuggestionGroup(2);
        }}
      >
        竹材太湿会影响编织吗？
      </button>
    </>
  )}

  {masterSuggestionGroup === 2 && (
    <>
      <button
        onClick={() => setMasterInput("怎样判断一根竹子适不适合起篾？")}
      >
        怎样判断一根竹子适不适合起篾？
      </button>

      <button
        onClick={() => setMasterInput("竹篾的粗细会影响纹样吗？")}
      >
        竹篾的粗细会影响纹样吗？
      </button>

      <button
        onClick={() => setMasterInput("老竹师，你觉得补遗纹最重要的是什么？")}
      >
        补遗纹最重要的是什么？
      </button>
    </>
  )}
</div>

      {/* 底部操作区 */}
<div className="master-bottom-bar">

{/* 新的习纹札记入口 */}
<button
  className="master-new-notebook"
  onClick={() => setScreen("notebook")}
  aria-label="进入习纹札记"
>
  <span className="master-new-notebook-icon">
    ◇
  </span>

  <span className="master-new-notebook-text">
    <strong>习纹札记</strong>
    <small>补纹线索收集</small>
  </span>
</button>

{/* AI 输入框 */}
<div className="master-ai-input-row">
  <input
    type="text"
    value={masterInput}
    onChange={(e) => setMasterInput(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        sendMasterMessage();
      }
    }}
    placeholder="向老竹师请教竹编之事……"
  />

  <button
    onClick={sendMasterMessage}
    disabled={masterAiLoading}
  >
    发送
  </button>
</div>

</div>
    </div>
  </>
)}

  </section>
)}
{/* =========================
    07-1 阿青
========================= */}
{screen === "aqing" && (
  <section className="screen aqing-entry-screen">

    {/* 还没进入正式对话 */}
    {!aqingChatOpen && (
      <>
        <img
          src={
            aqingIntroOpen
              ? "/aqing-intro.png"
              : "/aqing-home.png"
          }
          alt="阿青"
          className="aqing-entry-bg"
        />

        {/* 返回坊内问学 */}
        <button
          className="aqing-back-button"
          onClick={() => {
            setAqingIntroOpen(false);
            setAqingChatOpen(false);
            setScreen("characters");
          }}
          aria-label="返回坊内问学"
        />

        {/* 人物介绍 */}
        <button
          className="aqing-intro-button"
          onClick={() => setAqingIntroOpen(true)}
          aria-label="人物介绍"
        />

        {/* 开启问话 */}
        <button
          className="aqing-chat-button"
          onClick={() => setAqingChatOpen(true)}
          aria-label="开启问话"
        />

        {/* 人物介绍引导 */}
        {!aqingIntroOpen && (
          <div className="aqing-intro-guide">
            点击查看人物介绍
          </div>
        )}

        {/* 开启问话引导 */}
        {aqingIntroOpen && (
          <div className="aqing-chat-guide">
            点击开启问话
          </div>
        )}
      </>
    )}

    {/* 正式 AI 对话 */}
    {aqingChatOpen && (
      <>
        <img
          src="/aqing-chat-bg.png"
          alt="阿青对话"
          className="aqing-entry-bg"
        />

        {/* 返回 */}
        <button
          className="aqing-back-button"
          onClick={() => setAqingChatOpen(false)}
          aria-label="返回"
        />

        <div className="aqing-ai-chat-panel">

          {/* 聊天记录 */}
          <div className="aqing-ai-messages">
            {aqingMessages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.role === "assistant"
                    ? "aqing-message aqing-message-ai"
                    : "aqing-message aqing-message-user"
                }
              >
                {msg.text}
              </div>
            ))}

            {aqingAiLoading && (
              <div className="aqing-message aqing-message-ai aqing-thinking">
                阿青正在翻看设计稿……
              </div>
            )}
          </div>

          {/* 推荐问题 */}
          <div className="aqing-suggested-questions">

            {aqingSuggestionGroup === 0 && (
              <>
                <button
                  onClick={() =>
                    setAqingInput("传统竹编纹样可以创新吗？")
                  }
                >
                  传统竹编纹样可以创新吗？
                </button>

                <button
                  onClick={() =>
                    setAqingInput("纹样要怎么拆解和重组？")
                  }
                >
                  纹样要怎么拆解和重组？
                </button>

                <button
                  onClick={() =>
                    setAqingInput("怎么让传统纹样更适合年轻人？")
                  }
                >
                  怎么让传统纹样更适合年轻人？
                </button>
              </>
            )}

            {aqingSuggestionGroup === 1 && (
              <>
                <button
                  onClick={() =>
                    setAqingInput("创新时哪些结构不能随便改？")
                  }
                >
                  创新时哪些结构不能随便改？
                </button>

                <button
                  onClick={() =>
                    setAqingInput("竹编纹样可以用在现代产品上吗？")
                  }
                >
                  竹编纹样可以用在现代产品上吗？
                </button>

                <button
                  onClick={() =>
                    setAqingInput("怎样判断一个新纹样是不是乱改？")
                  }
                >
                  怎样判断一个新纹样是不是乱改？
                </button>
              </>
            )}

            {aqingSuggestionGroup === 2 && (
              <>
                <button
                  onClick={() =>
                    setAqingInput("怎样把传统纹样转成新的视觉语言？")
                  }
                >
                  怎样把传统纹样转成新的视觉语言？
                </button>

                <button
                  onClick={() =>
                    setAqingInput("你设计竹编文创时最先看什么？")
                  }
                >
                  你设计竹编文创时最先看什么？
                </button>

                <button
                  onClick={() =>
                    setAqingInput("真正的创新和表面改造有什么区别？")
                  }
                >
                  真正的创新和表面改造有什么区别？
                </button>
              </>
            )}

          </div>

          {/* 底部操作区 */}
          <div className="master-bottom-bar">

            {/* 习纹札记 */}
            <button
              className="master-new-notebook"
              onClick={() => setScreen("notebook")}
              aria-label="进入习纹札记"
            >
              <span className="master-new-notebook-icon">
                ◇
              </span>

              <span className="master-new-notebook-text">
                <strong>习纹札记</strong>
                <small>补纹线索收集</small>
              </span>
            </button>

            {/* 阿青输入框 */}
            <div className="master-ai-input-row">
              <input
                type="text"
                value={aqingInput}
                onChange={(e) =>
                  setAqingInput(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendAqingMessage();
                  }
                }}
                placeholder="向阿青聊聊纹样与设计……"
              />

              <button
                onClick={sendAqingMessage}
                disabled={aqingAiLoading}
              >
                发送
              </button>
            </div>

          </div>

        </div>
      </>
    )}

  </section>
)}

{/* =========================
    07-2 陈阿婆
========================= */}
{screen === "chenapo" && (
  <section className="screen chenapo-entry-screen">

    {!chenapoChatOpen && (
      <>
        <img
          src={
            chenapoIntroOpen
              ? "/chenapo-intro.png"
              : "/chenapo-home.png"
          }
          alt="陈阿婆"
          className="chenapo-entry-bg"
        />

        <button
          className="chenapo-back-button"
          onClick={() => {
            setChenapoIntroOpen(false);
            setChenapoChatOpen(false);
            setScreen("characters");
          }}
          aria-label="返回坊内问学"
        />

        <button
          className="chenapo-intro-button"
          onClick={() => setChenapoIntroOpen(true)}
          aria-label="人物介绍"
        />

        <button
          className="chenapo-chat-button"
          onClick={() => setChenapoChatOpen(true)}
          aria-label="开启问话"
        />

        {!chenapoIntroOpen && (
          <div className="chenapo-intro-guide">
            点击查看人物介绍
          </div>
        )}

        {chenapoIntroOpen && (
          <div className="chenapo-chat-guide">
            点击开启问话
          </div>
        )}
      </>
    )}

    {chenapoChatOpen && (
      <>
        <img
          src="/chenapo-chat-bg.png"
          alt="陈阿婆对话"
          className="chenapo-entry-bg"
        />

        <button
          className="chenapo-back-button"
          onClick={() => setChenapoChatOpen(false)}
          aria-label="返回"
        />

        <div className="chenapo-ai-chat-panel">

          <div className="chenapo-ai-messages">
            {chenapoMessages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.role === "assistant"
                    ? "chenapo-message chenapo-message-ai"
                    : "chenapo-message chenapo-message-user"
                }
              >
                {msg.text}
              </div>
            ))}

            {chenapoAiLoading && (
              <div className="chenapo-message chenapo-message-ai chenapo-thinking">
                陈阿婆正在理竹篾……
              </div>
            )}
          </div>

          <div className="chenapo-suggested-questions">
            {chenapoSuggestionGroup === 0 && (
              <>
                <button
                  onClick={() =>
                    setChenapoInput("竹编纹样为什么会和村里的生活有关？")
                  }
                >
                  竹编纹样为什么会和村里的生活有关？
                </button>

                <button
                  onClick={() =>
                    setChenapoInput("以前村里人会在什么场合用这些纹样？")
                  }
                >
                  以前村里人会在什么场合用这些纹样？
                </button>

                <button
                  onClick={() =>
                    setChenapoInput("有些纹样为什么会一代代传下来？")
                  }
                >
                  有些纹样为什么会一代代传下来？
                </button>
              </>
            )}

            {chenapoSuggestionGroup === 1 && (
              <>
                <button
                  onClick={() =>
                    setChenapoInput("祈福纹样一般代表什么？")
                  }
                >
                  祈福纹样一般代表什么？
                </button>

                <button
                  onClick={() =>
                    setChenapoInput("村里老人是怎么教年轻人认纹样的？")
                  }
                >
                  村里老人是怎么教年轻人认纹样的？
                </button>

                <button
                  onClick={() =>
                    setChenapoInput("纹样和节庆有什么关系？")
                  }
                >
                  纹样和节庆有什么关系？
                </button>
              </>
            )}

            {chenapoSuggestionGroup === 2 && (
              <>
                <button
                  onClick={() =>
                    setChenapoInput("哪种纹样最能代表百丈村？")
                  }
                >
                  哪种纹样最能代表百丈村？
                </button>

                <button
                  onClick={() =>
                    setChenapoInput("如果纹样失传了，会失去什么？")
                  }
                >
                  如果纹样失传了，会失去什么？
                </button>

                <button
                  onClick={() =>
                    setChenapoInput("这些纹样里藏着哪些民俗故事？")
                  }
                >
                  这些纹样里藏着哪些民俗故事？
                </button>
              </>
            )}
          </div>

          {/* 直接复用老竹师同款底部栏 */}
          <div className="master-bottom-bar">

            <button
              className="master-new-notebook"
              onClick={() => setScreen("notebook")}
              aria-label="进入习纹札记"
            >
              <span className="master-new-notebook-icon">◇</span>

              <span className="master-new-notebook-text">
                <strong>习纹札记</strong>
                <small>补纹线索收集</small>
              </span>
            </button>

            <div className="master-ai-input-row">
              <input
                type="text"
                value={chenapoInput}
                onChange={(e) => setChenapoInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendChenapoMessage();
                  }
                }}
                placeholder="向陈阿婆问问村里的竹编故事……"
              />

              <button
                onClick={sendChenapoMessage}
                disabled={chenapoAiLoading}
              >
                发送
              </button>
            </div>

          </div>

        </div>
      </>
    )}

  </section>
)}
{/* =========================
    07-3 张策展人
========================= */}
{screen === "zhang" && (
  <section className="screen zhang-entry-screen">

    {/* 还没进入正式对话 */}
    {!zhangChatOpen && (
      <>
        <img
          src={
            zhangIntroOpen
              ? "/zhang-intro.png"
              : "/zhang-home.png"
          }
          alt="张策展人"
          className="zhang-entry-bg"
        />

        {/* 返回 */}
        <button
          className="zhang-back-button"
          onClick={() => {
            setZhangIntroOpen(false);
            setZhangChatOpen(false);
            setScreen("characters");
          }}
          aria-label="返回坊内问学"
        />

        {/* 人物介绍 */}
        <button
          className="zhang-intro-button"
          onClick={() => setZhangIntroOpen(true)}
          aria-label="人物介绍"
        />

        {/* 开启问话 */}
        <button
          className="zhang-chat-button"
          onClick={() => setZhangChatOpen(true)}
          aria-label="开启问话"
        />

        {!zhangIntroOpen && (
          <div className="zhang-intro-guide">
            点击查看人物介绍
          </div>
        )}

        {zhangIntroOpen && (
          <div className="zhang-chat-guide">
            点击开启问话
          </div>
        )}
      </>
    )}

    {/* 正式 AI 对话 */}
    {zhangChatOpen && (
      <>
        <img
          src="/zhang-chat-bg.png"
          alt="张策展人对话"
          className="zhang-entry-bg"
        />

        <button
          className="zhang-back-button"
          onClick={() => setZhangChatOpen(false)}
          aria-label="返回"
        />

        <div className="zhang-ai-chat-panel">

          {/* 聊天记录 */}
          <div className="zhang-ai-messages">
            {zhangMessages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.role === "assistant"
                    ? "zhang-message zhang-message-ai"
                    : "zhang-message zhang-message-user"
                }
              >
                {msg.text}
              </div>
            ))}

            {zhangAiLoading && (
              <div className="zhang-message zhang-message-ai zhang-thinking">
                张策展人正在整理展陈方案……
              </div>
            )}
          </div>

          {/* 推荐问题 */}
          <div className="zhang-suggested-questions">

            {zhangSuggestionGroup === 0 && (
              <>
                <button
                  onClick={() =>
                    setZhangInput("传统竹编怎样才能吸引更多年轻人？")
                  }
                >
                  传统竹编怎样才能吸引更多年轻人？
                </button>

                <button
                  onClick={() =>
                    setZhangInput("你觉得什么样的纹样最适合展览？")
                  }
                >
                  什么样的纹样最适合展览？
                </button>

                <button
                  onClick={() =>
                    setZhangInput("竹编要怎么做才更有传播度？")
                  }
                >
                  竹编要怎么做才更有传播度？
                </button>
              </>
            )}

            {zhangSuggestionGroup === 1 && (
              <>
                <button
                  onClick={() =>
                    setZhangInput("传统纹样可以为了市场需求修改吗？")
                  }
                >
                  传统纹样可以为了市场需求修改吗？
                </button>

                <button
                  onClick={() =>
                    setZhangInput("展览里故事重要还是视觉效果重要？")
                  }
                >
                  故事重要还是视觉效果重要？
                </button>

                <button
                  onClick={() =>
                    setZhangInput("怎样让竹编展陈更容易被拍照传播？")
                  }
                >
                  怎样让竹编展陈更容易被传播？
                </button>
              </>
            )}

            {zhangSuggestionGroup === 2 && (
              <>
                <button
                  onClick={() =>
                    setZhangInput("流量和传统保护冲突时你会怎么选？")
                  }
                >
                  流量和传统保护冲突时你会怎么选？
                </button>

                <button
                  onClick={() =>
                    setZhangInput("什么样的竹编最有商业价值？")
                  }
                >
                  什么样的竹编最有商业价值？
                </button>

                <button
                  onClick={() =>
                    setZhangInput("你怎么看只保留纹样外形的创新？")
                  }
                >
                  你怎么看只保留纹样外形的创新？
                </button>
              </>
            )}

          </div>

          {/* 底部：继续复用老竹师的样式 */}
          <div className="master-bottom-bar">

            <button
              className="master-new-notebook"
              onClick={() => setScreen("notebook")}
              aria-label="进入习纹札记"
            >
              <span className="master-new-notebook-icon">
                ◇
              </span>

              <span className="master-new-notebook-text">
                <strong>习纹札记</strong>
                <small>补纹线索收集</small>
              </span>
            </button>

            <div className="master-ai-input-row">
              <input
                type="text"
                value={zhangInput}
                onChange={(e) =>
                  setZhangInput(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendZhangMessage();
                  }
                }}
                placeholder="向张策展人聊聊展陈与传播……"
              />

              <button
                onClick={sendZhangMessage}
                disabled={zhangAiLoading}
              >
                发送
              </button>
            </div>

          </div>

        </div>
      </>
    )}

  </section>
)}

      {/* =========================
    08 习纹札记首页
========================= */}
{screen === "notebook" && (
  <section className="screen notebook-home-screen">

    <img
      src="/notebook-home.png"
      alt="习纹札记"
      className="notebook-home-bg"
    />

    <button
      className="notebook-back-button"
      onClick={() => setScreen("home")}
      aria-label="返回玩竹工坊"
    />

    {/* 工艺之理 */}
    <button
      className="notebook-book-layer notebook-craft-book"
      onClick={() => setScreen("craftNotebook")}
      aria-label="进入工艺之理"
    >
      <img src="/craft-book.png" alt="" />
    </button>

    {/* 纹样之意 */}
    <button
      className="notebook-book-layer notebook-pattern-book"
      aria-label="进入纹样之意"
    >
      <img src="/pattern-book.png" alt="" />
    </button>

  </section>
)}


{/* =========================
    08-1 工艺之理
========================= */}
{screen === "craftNotebook" && (
  <section className="screen craft-notebook-screen">

    <img
      src="/craft-notebook-home.png"
      alt="工艺之理"
      className="craft-notebook-bg"
    />

    <button
      className="craft-notebook-back"
      onClick={() => setScreen("notebook")}
      aria-label="返回习纹札记"
    />

  </section>
)}

{/* =========================
    09 补纹台
========================= */}
{screen === "puzzle" && (
  <section className="screen puzzle-screen">
    <img
      src="/puzzle-home.png"
      alt="补谱·补纹台"
      className="puzzle-home-bg"
    />
    {/* 补纹进度覆盖层 */}
    <div className="puzzle-progress-patch">
      <span className="puzzle-progress-label">复原进度</span>
    
      <span className="puzzle-progress-number">
        {firstFragmentPlaced ? "1/4" : "0/4"}
      </span>
    
      <div className="puzzle-progress-diamonds">
        <span className={firstFragmentPlaced ? "filled" : ""}>◇</span>
        <span>◇</span>
        <span>◇</span>
        <span>◇</span>
      </div>
    </div>
    {/* 第一条线索状态 */}
{firstFragmentUnlocked && (
  <div
    className={`puzzle-clue-status ${
      firstFragmentPlaced ? "used" : ""
    }`}
  >
    {firstFragmentPlaced ? "已用于补纹" : "已解锁碎片"}
  </div>
)}

    {/* 左上角返回：这里先返回习纹札记首页，你也可以改成 home */}
    <button
      className="puzzle-back-button"
      onClick={() => setScreen("notebook")}
      aria-label="返回习纹札记"
    />

    {/* =========================
       右侧第一个未解锁碎片：点击出题
    ========================= */}
    {!firstFragmentUnlocked && !firstFragmentPlaced && (
      <button
        className="fragment-hotspot fragment-1-hotspot"
        onClick={openFirstPuzzleQuestion}
        aria-label="解锁第一个碎片"
      />
    )}

    {/* =========================
       已解锁：右侧第一个碎片可拖拽
    ========================= */}
    {firstFragmentUnlocked && !firstFragmentPlaced && (
      <div
        className={`fragment-drag-source ${draggingFragment ? "dragging" : ""}`}
        draggable
        onDragStart={handleFragmentDragStart}
        onDragEnd={handleFragmentDragEnd}
        aria-label="可拖拽碎片"
      >
        <div className="fragment-live-card">
          <div className="fragment-pattern fragment-pattern-1" />
          <span className="fragment-live-badge">已解锁</span>
        </div>
      </div>
    )}

    {/* =========================
       中央图谱的第一个缺口：拖放目标区
    ========================= */}
    <div
      className={`puzzle-dropzone ${firstFragmentPlaced ? "placed" : ""}`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleFragmentDrop}
      aria-label="图谱缺口"
    >
      {firstFragmentPlaced && (
  <div className="placed-fragment">
    <div className="fragment-pattern fragment-pattern-1 placed-fill" />
  </div>
)}
    </div>

    {/* 拖拽提示 */}
    {firstFragmentUnlocked && !firstFragmentPlaced && (
      <div className="puzzle-drag-tip">
        已解锁碎片，请拖拽到中央图谱缺口
      </div>
    )}

    {/* 已完成提示 */}
    {firstFragmentPlaced && (
      <div className="puzzle-complete-tip">
        已完成第一块补纹，复原进度 +1
      </div>
    )}

    {/* =========================
       弹窗答题
    ========================= */}
    {showPuzzleQuestion && (
      <div className="puzzle-modal-mask">
        <div className="puzzle-question-card">
          <button
            className="puzzle-question-close"
            onClick={() => setShowPuzzleQuestion(false)}
            aria-label="关闭答题弹窗"
          >
            ×
          </button>

          <div className="puzzle-question-badge">线索答题</div>
          <h3 className="puzzle-question-title">材料口诀 · 顺时取竹</h3>
          <p className="puzzle-question-desc">
            根据老竹师给出的线索，哪一项最符合取竹时机的工艺规律？
          </p>

          <div className="puzzle-options">
            <button
              className={`puzzle-option ${selectedPuzzleAnswer === "a" ? "selected" : ""}`}
              onClick={() => setSelectedPuzzleAnswer("a")}
            >
              A. 顺时取竹
            </button>

            <button
              className={`puzzle-option ${selectedPuzzleAnswer === "b" ? "selected" : ""}`}
              onClick={() => setSelectedPuzzleAnswer("b")}
            >
              B. 雨中急采
            </button>

            <button
              className={`puzzle-option ${selectedPuzzleAnswer === "c" ? "selected" : ""}`}
              onClick={() => setSelectedPuzzleAnswer("c")}
            >
              C. 逆节取材
            </button>
          </div>

          <div className="puzzle-result-row">
            {answerResult === "correct" && (
              <p className="puzzle-result success">
                回答正确，碎片已解锁。
              </p>
            )}
            {answerResult === "wrong" && (
              <p className="puzzle-result error">
                回答不正确，再想想老竹师提到的“顺应竹性”。
              </p>
            )}
          </div>

          <div className="puzzle-question-actions">
            <button
              className="puzzle-action secondary"
              onClick={() => {
                setSelectedPuzzleAnswer(null);
                setAnswerResult("idle");
              }}
            >
              重新选择
            </button>

            <button
              className="puzzle-action primary"
              onClick={submitPuzzleAnswer}
            >
              确认作答
            </button>
          </div>
        </div>
      </div>
        )}

        </section>
      )}
      
      </main>
      );
      }

      /* =========================
         通用组件
      ========================= */
      
      function Header({ title }: { title: string }) {
  return (
    <div className="header-title">
      <h2>{title}</h2>

      <div className="title-line">
        <span />
        <i />
        <span />
      </div>
    </div>
  );
}

function BackButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <button
      className="back-btn"
      onClick={onClick}
    >
      ←
    </button>
  );
}

function StoryPage({
  number,
  title,
  text,
  onNext,
  buttonText = "下一页",
}: {
  number: string;
  title: React.ReactNode;
  text: React.ReactNode;
  onNext: () => void;
  buttonText?: string;
}) {
  return (
    <section className="screen story-screen">
      <div className="story-scroll">
        <span className="story-number">
          {number}
        </span>

        <div className="story-text">
          <h2>{title}</h2>
          <p>{text}</p>
        </div>

        <div className="story-illustration">
          <div className="story-bamboo">
            <i />
            <i />
            <i />
          </div>

          <span>
            后续替换为剧情插画
          </span>
        </div>
      </div>

      <button
        className="story-next"
        onClick={onNext}
      >
        {buttonText} →
      </button>
    </section>
  );
}

function HomeCard({
  index,
  symbol,
  title,
  description,
  status,
  onClick,
  hasNew = false,
}: {
  index: string;
  symbol: string;
  title: string;
  description: string;
  status: string;
  onClick: () => void;
  hasNew?: boolean;
}) {
  return (
    <button
      className="home-card"
      onClick={onClick}
    >
      <span className="card-index">
        {index}
      </span>

      {hasNew && (
        <span className="new-badge">
          新
        </span>
      )}

      <div className="card-symbol">
        {symbol}
      </div>

      <h3>{title}</h3>
      <p>{description}</p>

      <span className="card-status">
        {status}
      </span>
    </button>
  );
}

function CharacterCard({
  name,
  role,
  hint,
  available = false,
  onClick,
}: {
  name: string;
  role: string;
  hint: string;
  available?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      className={`character-card ${
        !available ? "disabled" : ""
      }`}
      onClick={
        available ? onClick : undefined
      }
    >
      <div className="character-avatar">
        {name.slice(0, 1)}
      </div>

      <h3>{name}</h3>
      <strong>{role}</strong>
      <p>{hint}</p>

      <span>
        {available
          ? "前去问学"
          : "暂未开放"}
      </span>
    </button>
  );
}

function ClueRow({
  title,
  source,
  text,
  unlocked = false,
}: {
  title: string;
  source?: string;
  text?: string;
  unlocked?: boolean;
}) {
  return (
    <div
      className={`clue-row ${
        unlocked
          ? "unlocked"
          : "locked"
      }`}
    >
      <div className="clue-thumbnail">
        {unlocked ? "竹" : "锁"}
      </div>

      <div className="clue-row-content">
        <h4>{title}</h4>

        {unlocked ? (
          <>
            <span>
              来源：{source}
            </span>

            <p>{text}</p>
          </>
        ) : (
          <span>
            尚未解锁
          </span>
        )}
      </div>

      <strong className="clue-status">
        {unlocked
          ? "已解锁"
          : "未解锁"}
      </strong>
    </div>
  );
}