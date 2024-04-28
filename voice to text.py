from flask import Flask, request, jsonify
import speech_recognition as sr
from pydub import AudioSegment
from flask_cors import CORS

def convert_to_wav(input_file, output_file):
    audio = AudioSegment.from_file(input_file)

    if audio.channels != 1:
        audio = audio.set_channels(1)
    if audio.sample_width != 2:
        audio = audio.set_sample_width(2)

    audio.export(output_file, format="wav")

app = Flask(__name__)
cors = CORS(app)
@app.route('/process_audio', methods=['POST'])
def process_audio():
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided'})
    audio_file = request.files['audio']
    output_file = "output_file.wav"
    permanent_filename = 'permanent_audio6.wav'
    audio_file.save(permanent_filename)
    convert_to_wav(permanent_filename, output_file)
    transcription = getmeaudio2text(output_file)
    return jsonify({'transcription': transcription})

def getmeaudio2text(audiofilename):
    r = sr.Recognizer()
    with sr.AudioFile(audiofilename) as source:
        audio_listened = r.listen(source)
    try:    
        rec = r.recognize_google(audio_listened)
        print("Speech to text :",rec)
        return rec
    except sr.UnknownValueError:
        print("Could not understand audio")
    except sr.RequestError as e:
        print("Could not request results.")
    return "Pl try again.."

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5050)
    # app.run(debug=True)