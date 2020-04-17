var schedule = require('node-schedule');
var patientController = require('./Controllers/patientController');
var time = require('./scheduleTime');
exports.plan = function(){
    time.Surveyschedule.forEach(plan => {
        const date = new Date(plan.date);
        plan.date=date;
        console.log("the "+plan.name+" is planned for "+date+" and it's addressed to "+plan.patient+" patients");
        schedule.scheduleJob(plan.name,{hour :date.getHours() ,minute : date.getMinutes()},()=>{
            console.log('the '+plan.name+' is planned');
            patientController.setPendingSurveyOn(plan.patient);
        });
        date.setHours(date.getHours()+plan.alertAfter);
        console.log("the Alert for"+plan.name+" is planned for "+date);
        schedule.scheduleJob(plan.name,{hour :date.getHours(),minute : date.getMinutes()},()=>{
            console.log('the alert for '+plan.name);
            patientController.setAlertOn();
        })
    });
    
}