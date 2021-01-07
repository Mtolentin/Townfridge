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
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'school'
    }
}, {timestamps: true})

const school = new mongoose.Schema({
    name: String,
    openSince: Number,
    students: Number,
    isGreat: Boolean,
    staff: [{type: String}]
})

const School = mongoose.model('school', school)
const Student = mongoose.model('student', student)

// connect()
//     .then(async connection => {
//         const student = await Student.create({firstName: 'Tim'})
//         console.log(student)
//     })
//     .catch(e => console.error(e))

    // connect()
    // .then(async connection => {
    //     const student = await Student.create({firstName: 'Tim'})
    //     const found = await Student.find({firstName: 'thi'})
    //     // await Student.find({}) // for return everything
    //     const foundById = await Student.findById('asdfsdfdsf')
    //     const updted = await Student.findByIdAndUpdate('sadfsdf', {})
    //     console.log(student)
    // })
    // .catch(e => console.error(e))

// connect()
//     .then(async connection => {
//         const school = await School.findOneAndUpdate(
//             {name: 'mlk elementary'}, 
//             {name: 'mlk elementary'}, 
//             {upsert: true, new: true}
//         ).exec()
//         const student = await Student.create(
//             {firstName: 'Trisha', school: school._id}
//         )
//         const student2 = await Student.create(
//             {firstName: 'Mark', school: school._id}
//         )
//         const match = await Student.findById(student2.id)
//             .populate('school')
//             .exec()
//         console.log(match)
//     })
//     .catch( e => console.error(e))

connect()
    .then(async connection => {
        const schoolConfig = {
            name: 'mlk elementary',
            openSince: 2009,
            students: 1000,
            isGreat: true,
            staff: ['a','b', 'c']

        }
        const schoolConfig2 = {
            name: 'Larry Middle School',
            openSince: 1980,
            students: 600,
            isGreat: false,
            staff: ['v','b', 'g']
        }
        const schools = await School.create(
            [schoolConfig, schoolConfig2]
        )
        const match = await School.find({
            // students: {$gt: 600, $lt: 800},
            // isGreat: true
            // staff: 'b'
            staff: {$in: ['g']}
        })
        .exec()
        console.log(match)
    })
    .catch( e => console.error(e))