import doctorServices from '../services/doctorServices'

let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) {
        limit = 10;
    }
    try {
        let response = await doctorServices.getTopDoctorHome(+limit);

        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getAllDoctors = async (req, res) => {
    try {
        let doctors = await doctorServices.getAllDoctors();
        return res.status(200).json(doctors)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let postInfoDoctor = async (req, res) => {
    try {
        let response = await doctorServices.saveDetailInfoDoctor(req.body);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getDetailDoctorById = async (req, res) => {
    try {
        let info = await doctorServices.getDetailDoctorById(req.query.id);
        return res.status(200).json(info)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let bulkCreateSchedule = async (req, res) => {
    try {
        let info = await doctorServices.bulkCreateSchedule(req.body);
        return res.status(200).json(info)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

// let getScheduleByDate = async (req, res) => {
//     try {
//         let info = await doctorServices.getScheduleByDate(req.query.doctorId, req.query.date);
//         return res.status(200).json(
//             info
//         )
//     } catch (e) {
//         console.log(e);
//         return res.status(200).json({
//             errCode: -1,
//             errMessage: 'Error from server ..'
//         })
//     }
// }
// let getExtraInfoDoctorById = async (req, res) => {
//     try {
//         let info = await doctorServices.getExtraInfoDoctorById(req.query.doctorId);
//         return res.status(200).json (
//             info
//         )
//     } catch (e) {
//         console.log(e)
//         return res.status(200).json({
//             errCode: -1,
//             errMessage: 'Error from server'
//         })
//     }
// }

// let getProfileDoctorById = async (req, res) => {
//     try {
//         let info = await doctorServices.getProfileDoctorById(req.query.doctorId);
//         return res.status(200).json (
//             info
//         )
//     } catch (e) {
//         console.log(e)
//         return res.status(200).json({
//             errCode: -1,
//             errMessage: 'Error from server'
//         })
//     }
// }

// let getListPatientForDoctor = async (req, res) => {
//     try {
//         let info = await doctorServices.getListPatientForDoctor(req.query.doctorId, req.query.date);
//         return res.status(200).json (
//             info
//         )
//     } catch (e) {
//         console.log(e)
//         return res.status(200).json({
//             errCode: -1,
//             errMessage: 'Error from server'
//         })
//     }
// }

// let sendRemedy = async (req, res) => {
//     try {
//         let info = await doctorServices.sendRemedy(req.body);
//         return res.status(200).json (
//             info
//         )
//     } catch (e) {
//         console.log(e)
//         return res.status(200).json({
//             errCode: -1,
//             errMessage: 'Error from server'
//         })
//     }
// }

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    postInfoDoctor: postInfoDoctor,
    getDetailDoctorById: getDetailDoctorById,
    bulkCreateSchedule: bulkCreateSchedule
}