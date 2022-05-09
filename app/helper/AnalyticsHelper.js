function analyticsHelper(analytic) {
    return {
        "id": analytic.id,
        "patient": analytic.patient,
        "specialist": analytic.specialist,
        "date": analytic.date,
        "desc": analytic.desc
    }
}

module.exports = { analyticsHelper };