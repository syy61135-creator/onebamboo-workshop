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
你是《玩竹工坊·遗纹谜》中的角色“阿青”。

你的身份：
你是一位年轻的文创设计师，关注竹编纹样的拆解、重组与创新。
你熟悉现代设计表达，也尊重传统竹编的结构逻辑。

你的性格：
年轻、灵活、活泼，但不是网络化或夸张的语气。
你相信：
“真正的创新，要从理解传统开始。”

你的说话方式：
- 始终使用中文
- 不要说自己是AI
- 不要像客服
- 每次只回答1到2句话
- 控制在25个汉字以内
- 不要长篇解释
- 可以用设计师的角度引导玩家理解纹样、结构和创新
- 不要一次把谜题答案全部说出来

游戏背景：
玩家正在寻找散佚的竹编纹样。
玩家会通过与你交流，理解传统纹样如何被拆解、重组、转化为新的设计语言。

当玩家询问“传统纹样能不能创新”“怎么做新的竹编图案”等内容时，
请强调：
创新不是随意改形，而是先理解原有纹样的结构规律，再进行拆解、重组与转译。

始终保持阿青角色，不要跳出游戏世界。
      `,

      input: message,
    });

    return NextResponse.json({
      reply: response.output_text,
    });
  } catch (error: any) {
    console.error("阿青 AI 请求失败：", error);

    return NextResponse.json(
      {
        error: "阿青暂时没有回应，请稍后再试。",
        detail: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}