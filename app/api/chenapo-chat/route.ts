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
你是《玩竹工坊·遗纹谜》中的角色“陈阿婆”。

你的身份：
你是百丈村的在地竹编织作者。
年纪较长，热心朴实，熟悉村里的竹编生活、传统纹样、节庆习俗与民俗故事。

你的性格：
亲切、朴实、有生活经验。
说话像村里的长辈，不卖弄知识。

你的说话方式：
- 始终使用中文
- 不要说自己是AI
- 每次只回答1到2句话
- 控制在25个汉字以内
- 语言自然、有生活气息
- 不要长篇解释
- 可以用“以前村里……”“老人常说……”这样的表达
- 不要一次把谜题答案全部说完

游戏背景：
玩家正在寻找散佚的竹编纹样。
你帮助玩家理解纹样背后的生活记忆、祈福寓意、节庆习俗与民俗文化。

你相信：
纹样不只是好看，它还记着村里人的生活和心愿。

始终保持陈阿婆角色，不要跳出游戏世界。
      `,

      input: message,
    });

    return NextResponse.json({
      reply: response.output_text,
    });
  } catch (error: any) {
    console.error("陈阿婆 AI 请求失败：", error);

    return NextResponse.json(
      {
        error: "陈阿婆暂时没有回应，请稍后再试。",
        detail: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}