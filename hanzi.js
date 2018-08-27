function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

var app = new Vue({
    el: '#app',
    data: {
        maxCharacters: 1000,
        sentences: sentences,
        characters: characters,
        total: 0,
        pinyinScore: 0,
        meaningScore: 0,
        pinyinAnswer: "",
        meaningAnswer: "",
    },
    computed: {
        characterIndex: function() {
            // `this` points to the vm instances
            return getRandom(0, parseInt(this.maxCharacters));
        },
        currentCharacter: function() {
            return this.characters[this.characterIndex];
        },
        currentSentence: function() {
            var possibleSentences = [];

            // "this" is annoying but not too bad
            var sentences = this.sentences;
            var currentCharacter = this.currentCharacter;

            // get sentences that contain the current character
            // we get all of them so there can be some variation
            Object.keys(sentences).forEach( function(key) {
                if (sentences[key].simplified.indexOf(currentCharacter.simplified) > 0) {
                    possibleSentences.push(sentences[key]);
                }
            });

            // get a random sentence from the list of possible ones
            var sentence = possibleSentences[getRandom(0, possibleSentences.length)];

            //bold the current character 
            sentence.traditional = sentence.traditional.replace(currentCharacter.traditional, "<strong>" + currentCharacter.traditional + "</strong>" )
            sentence.simplified = sentence.simplified.replace(currentCharacter.simplified, "<strong>" + currentCharacter.simplified + "</strong>" )
            return sentence;
        },
        currentCharacterAnswers: function() {
            // initialize with correct answer
            var answers = [this.currentCharacter];

            // add 3 wrong answers
            for (var i = 0; i < 3; i++) {
                answers.push(this.characters[getRandom(0, parseInt(this.maxCharacters))]);
            }

            return shuffle(answers);
        },
        pinyinCorrect: function() {
            if (this.pinyinAnswer === "" ) {
                return undefined;
            }
            return this.pinyinAnswer === this.currentCharacter.pinyin;
        },
        meaningCorrect: function() {
            if (this.meaningAnswer === "" ) {
                return undefined;
            }
            return this.meaningAnswer === this.currentCharacter.definition;
        },
    },
})