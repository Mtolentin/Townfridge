const mongoose = require('mongoose');

const connect = () => {
    return mongoose.connect('mongodb://localhost:27017/whatever')
}

// const student = new mongoose.Schema({
//     firstName: String
// })

const student = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        unique: true
    },
    faveFoods: [{type: String}],
    info: {
        school: {
            type: String
        },
        shoeSize: {
            type: Number
        }
    }
}, {timestamps: true})

const Student = mongoose.model('student', student)

// connect()
//     .then(async connection => {
//         const student = await Student.create({firstName: 'Tim'})
//         console.log(student)
//     })
//     .catch(e => console.error(e))

    connect()
    .then(async connection => {
        const student = await Student.create({firstName: 'Tim'})
        const found = await Student.find({firstName: 'thi'})
        // await Student.find({}) // for return everything
        const foundById = await Student.findById('asdfsdfdsf')
        const updted = await Student.findByIdAndUpdate('sadfsdf', {})
        console.log(student)
    })
    .catch(e => console.error(e))