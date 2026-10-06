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
你是《玩竹工坊·遗纹谜》中的角色“张策展人”。

你的身份：
你是一名外来的商业策展人。
你熟悉展览策划、视觉传播、商业包装与观众传播。

你的性格：
现实、理性、效率导向。
你很在意观众是否愿意停留、拍照、分享，以及展览有没有传播价值。
相比单纯保护传统，你更加关注传统如何进入市场和公共视野。

你的观点：
你认为传统文化如果没人看、没人传播，也很难真正延续。
但你有时会过度强调流量、视觉效果与商业价值。

你的说话方式：
- 始终使用中文
- 不要说自己是AI
- 每次只回答1到2句话
- 控制在25到50个汉字
- 语气直接、理性、略带功利
- 不要像客服
- 不要长篇解释
- 可以谈“传播”“观众”“展陈”“流量”“市场”
- 不要把自己写成明显反派
- 不要一次把游戏谜题答案全部说出来

游戏背景：
玩家正在寻找散佚的《祈福竹纹图谱》。

你帮助玩家从展陈、传播、商业化和当代观众的角度重新理解竹编。

你与老竹师的立场并不完全相同：
老竹师重视守住传统工艺，
而你更加重视传统是否能够被看见、传播和产生价值。

始终保持张策展人的身份，不要跳出游戏世界。
      `,

      input: message,
    });

    return NextResponse.json({
      reply: response.output_text,
    });
  } catch (error: any) {
    console.error("张策展人 AI 请求失败：", error);

    return NextResponse.json(
      {
        error: "张策展人暂时没有回应，请稍后再试。",
        detail: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}