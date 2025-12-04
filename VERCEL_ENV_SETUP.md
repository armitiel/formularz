# Vercel Environment Variables Setup

## Required Environment Variables for OpenRouter AI Integration

### 1. OPENROUTER_API_KEY
**Variable Name:** `OPENROUTER_API_KEY`  
**Value:** Your OpenRouter API key (starts with `sk-or-...`)  
**Where to get it:** https://openrouter.ai/keys  

**Steps to get the API key:**
1. Go to https://openrouter.ai
2. Sign up/Login
3. Go to "Keys" section
4. Generate a new API key
5. Copy the key (format: `sk-or-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)

### 2. OPENROUTER_MODEL (Optional)
**Variable Name:** `OPENROUTER_MODEL`  
**Default Value:** `meta-llama/llama-3.1-8b-instruct`  
**Recommended Value:** `meta-llama/llama-3.1-8b-instruct` (good balance of quality and cost)
**Alternative Values:** 
- `openai/gpt-3.5-turbo` (faster, lower cost)
- `openai/gpt-4` (higher quality, higher cost)
- `anthropic/claude-3-haiku` (good quality, moderate cost)

## How to Set Variables in Vercel

1. **Go to your Vercel dashboard**
2. **Select your project** (formularz)
3. **Go to Settings tab**
4. **Click on Environment Variables**
5. **Add the variables:**
   - Name: `OPENROUTER_API_KEY`
   - Value: `sk-or-your-actual-api-key-here`
   - Environment: Production, Preview, Development (check all)

6. **Redeploy your application** for changes to take effect

## Cost Information

**OpenRouter Pricing (as of 2024):**
- `meta-llama/llama-3.1-8b-instruct`: ~$0.0001 per 1K tokens (very cheap)
- `openai/gpt-3.5-turbo`: ~$0.002 per 1K tokens 
- `openai/gpt-4`: ~$0.03 per 1K tokens

**Estimated costs for this app:**
- Each proposal generation uses ~1000-2000 tokens
- With llama-3.1-8b: ~$0.0001-0.0002 per proposal
- With gpt-3.5: ~$0.002-0.004 per proposal
- With gpt-4: ~$0.03-0.06 per proposal

## Testing

**Without API key:** App will use fallback template generation (still works!)
**With API key:** App will use AI to generate more sophisticated, contextual proposals

## Future Email Variables (not yet implemented)

For future email functionality, you may also want to add:
- `RESEND_API_KEY` - for email sending via Resend
- `EMAIL_FROM` - sender email address

## API Endpoint

The API endpoint is: `POST /api/agent`  
Full URL: `https://your-vercel-domain.vercel.app/api/agent`