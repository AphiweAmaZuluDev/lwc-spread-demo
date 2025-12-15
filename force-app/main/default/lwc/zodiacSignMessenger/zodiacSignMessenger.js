import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ZodiacSignMessenger extends LightningElement {

    // Zodiac Signs Object
    zodiacTraits = [
    {
        sign: "Aries",
        from: "03-21",
        to: "04-19",
        emoji: "♈",
        trait: "you are bold, ambitious, and energetic. You love to be number one and often dive headfirst into even the most challenging situations."
    },
    {
        sign: "Taurus",
        from: "04-20",
        to: "05-20",
        emoji: "♉",
        trait: "You are known for being reliable, practical, and devoted. You value stability and enjoy the finer things in life."
    },
    {
        sign: "Gemini",
        from: "05-21",
        to: "06-20",
        emoji: "♊",
        trait: "You are expressive and quick-witted. Gemini represents two different personalities in one and is sociable, communicative, and ready for fun."
    },
    {
        sign: "Cancer",
        from: "06-21",
        to: "07-22",
        emoji: "♋",
        trait: "You are deeply intuitive and sentimental. Cancer can be one of the most challenging signs to get to know but is incredibly loyal and protective of loved ones."
    },
    {
        sign: "Leo",
        from: "07-23",
        to: "08-22",
        emoji: "♌",
        trait: "You are passionate, loyal, and famously dramatic. Leo is a spirited fire sign that loves to bask in the spotlight and celebrate themselves."
    },
    {
        sign: "Virgo",
        from: "08-23",
        to: "09-22",
        emoji: "♍",
        trait: "You are logical, practical, and systematic in your approach to life. You tend to lean towards prefectionism and you aren’t afraid to improve skills through diligent practice."
    },
    {
        sign: "Libra",
        from: "09-23",
        to: "10-22",
        emoji: "♎",
        trait: "You are obsessed with symmetry and strive to create equilibrium in all areas of life. You are also cooperative, diplomatic, and gracious."
    },
    {
        sign: "Scorpio",
        from: "10-23",
        to: "11-21",
        emoji: "♏",
        trait: "You are passionate and independent. You derive your strength from the psychic and emotional realm and are often misunderstood due to your intensity."
    },
    {
        sign: "Sagittarius",
        from: "11-22",
        to: "12-21",
        emoji: "♐",
        trait: "Your are curious and energetic. You are one of the biggest travelers among all zodiac signs. Your open mind and philosophical view motivates you to wander around the world in search of the meaning of life."
    },
    {
        sign: "Capricorn",
        from: "12-22",
        to: "01-19",
        emoji: "♑",
        trait: "You are responsible, disciplined, and self-controlled. You are a master of self-control and have the ability to lead the way and make solid and realistic plans."
    },
    {
        sign: "Aquarius",
        from: "01-20",
        to: "02-18",
        emoji: "♒",
        trait: "You are a deep thinker and a highly intellectual person who loves helping others. You are able to see without prejudice, on both sides, which makes you someone who can easily solve problems."
    },
    {
        sign: "Pisces",
        from: "02-19",
        to: "03-20",
        emoji: "♓",
        trait: "You are very friendly, so you often find yourself in the company of very different people. You are selfless and always willing to help others, without hoping to get anything back."
    }
];

    // Variables
    userName
    userBirthDate
    namePlaceholder
    dobPlaceholder

    infoEntered = false
    @track userProfile = {}


    // Methods
    handleNameChange(event) {
        this.namePlaceholder = event.detail.value
    }

    handleBirthDateChange(event) {
        this.dobPlaceholder = event.detail.value
    }

    handleSubmit() {
        // Validate input fields
        let isValid = true

        const inputFields  = this.template.querySelectorAll('lightning-input')

        inputFields.forEach(field => {
            if(field.value === null || field.value === '') {
                isValid = false
            }
        })

        if(!isValid) {
            this.showToast('Error', 'Please enter a valid name and date of birth', 'error')
        }

        // Find the Zodiac sign
        this.userName = this.namePlaceholder
        this.userBirthDate = this.dobPlaceholder
        const userDob = new Date(this.userBirthDate)
        const day = userDob.getDate()
        const month = userDob.getMonth() + 1

        this.userProfile = this.selectZodiacSign(month, day)
        this.clearInputsAndPlaceholders()
    }

    selectZodiacSign(month, day) {
        for (let sign of this.zodiacTraits) {
            const [fromMonth, fromDay] = sign.from.split('-').map(Number)
            const [toMonth, toDay] = sign.to.split('-').map(Number)
            
            if((month === fromMonth && day >= fromDay) || (month === toMonth && day <= toDay)) {
                this.infoEntered = true
                return sign
            }
        }
    }

    clearPlaceholders() {
        this.dobPlaceholder = ''
        this.namePlaceholder = ''
    }

    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        })
        this.dispatchEvent(evt)
    }
}