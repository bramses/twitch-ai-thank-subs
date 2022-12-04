
# Installation

`todo`


# Running

`todo`

# What is this?

INSPIRATION: https://clips.twitch.tv/FunCrunchyCoyoteKevinTurtle-NNnw6YJrV4zInI5N
DEMO: https://www.youtube.com/watch?v=Z96vdDX2qik&ab_channel=BramAdams

1. When someone subscribes on Twitch, a webhook is sent to the server.
2. The server then creates an OpenAI GPT-3 "thank you" on a random seed prompt and the subscriber's name
3. The text is sent to Uberduck to be converted to speech (voices picked from top 10 most popular usage + quality voices on Uberduck)
4. The bot uses node-wav-player to play the audio file
5. The bot displays the text on the screen for clarity