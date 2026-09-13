class AppConfig {
	
   
public readonly openaiUrl = "https://api.openai.com/v1/chat/completions";
public readonly openaiModel = "gpt-5.5";
public readonly openaiApiKey =  import.meta.env.VITE_OPENAI_API_KEY;
}

export const appConfig = new AppConfig();
