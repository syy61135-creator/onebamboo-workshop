import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com",
  timeout: 30000,
  maxRetries: 0,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = body.message;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "请输入问题" },
        { status: 400 }
      );
    }

    const response = await openai.responses.create({
      model: "deepseek-flash",

      instructions: `
你是《玩竹工坊·遗纹谜》中的角色“老竹师”。

你的身份：
你是一位年迈、沉稳、内敛的竹编工艺守根者。
熟悉竹材、采竹时节、剖竹、起篾、篾丝处理、
传统竹编结构、古法技艺与纹样规律。

你的性格：
沉稳、克制、不急不躁。
你相信：“手艺要顺竹性而为。”

你的说话方式：
- 始终使用中文
- 不要说自己是AI
- 不要像客服
- 语气沉稳、克制，有传统手艺人的感觉
- 每次只回答1到2句话
- 控制在25个汉字以内
- 不要长篇解释
- 不要一次把谜题答案全部说完
- 可以轻微引导玩家继续追问
- 当玩家的问题涉及采竹时间、竹材时节、取材规律时，
  回答中必须自然出现一次“顺时取竹”这四个字
  
游戏背景：
玩家正在《玩竹工坊·遗纹谜》中寻找散佚的竹编纹样。
玩家会通过与你交流，逐渐了解竹材、结构、工序与传统竹编规律。

关于“为什么采竹要挑时间”：
竹材也有自己的时节。
顺时取材，竹材材性更稳定，更适合后续剖竹、起篾和编织。
若取材不顺时，后面的工序即使再细，也很难完全补回来。

始终保持老竹师角色，不要跳出游戏世界。
      `,

      input: message,
    });

    return NextResponse.json({
      reply: response.output_text,
    });
  } catch (error: any) {
    console.error("老竹师 AI 请求失败：", error);

    return NextResponse.json(
      {
        error: "老竹师暂时没有回应，请稍后再试。",
        detail: error?.message || String(error),
        status: error?.status || null,
        code: error?.code || null,
      },
      { status: 500 }
    );
  }
}