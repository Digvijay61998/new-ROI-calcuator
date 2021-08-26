
function getInputs(){
    // First take the input from the fields.
    let average_no_of_docs_processed_per_day = Number(document.getElementById('Avg_no').value )|| 0;
    let no_of_employees = Number(document.getElementById('Employ_no').value) || 0;
    let time_in_minutes_to_process_single_doc = Number(document.getElementById('Time_req').value) || 0;
    let automation_factor = Number(document.getElementById('automation_factor').value)/100 || 1;
    const employee_hours_per_day = 8;
    return {
        average_no_of_docs_processed_per_day,
        no_of_employees,
        time_in_minutes_to_process_single_doc,
        automation_factor,
        employee_hours_per_day
    }
}



function process(){
    try {
        const {
            average_no_of_docs_processed_per_day,
            no_of_employees,
            time_in_minutes_to_process_single_doc,
            automation_factor,
            employee_hours_per_day} = getInputs();

            if(!average_no_of_docs_processed_per_day || !no_of_employees){
                return;
            }
            const no_of_docs_processed_per_day_per_employee = get_no_of_docs_processed_per_day(average_no_of_docs_processed_per_day , no_of_employees)
            document.getElementById("no_of_docs_processed_per_day").innerText = no_of_docs_processed_per_day_per_employee;
            
            if(!time_in_minutes_to_process_single_doc || !employee_hours_per_day || !no_of_docs_processed_per_day_per_employee){
                return;
            }
            const day_spent_processing_per_employee= get_day_spent_processing_per_employee(no_of_docs_processed_per_day_per_employee,employee_hours_per_day,time_in_minutes_to_process_single_doc);
            document.getElementById("day_spent_processing_per_employee").innerText = day_spent_processing_per_employee+'%';

            if(!average_no_of_docs_processed_per_day  || !time_in_minutes_to_process_single_doc || !employee_hours_per_day || !automation_factor){
                return;
            }

            const time_saved_per_day = get_time_saved_per_day(average_no_of_docs_processed_per_day , time_in_minutes_to_process_single_doc, automation_factor)
            document.getElementById("time_saved_per_day").innerText= time_saved_per_day+' (Hrs)';

            
            const time_saved_per_year = get_time_saved_per_year(time_saved_per_day)
            document.getElementById("time_saved_per_year").innerText= time_saved_per_year+ ' (Hrs)';
            
            const employee_freed = get_employee_freed(time_saved_per_year,employee_hours_per_day);
            document.getElementById("employee_freed").innerText = employee_freed;



    } catch (error) {
        console.log(error);
    }
}


/**
 * @function get_time_saved_per_year
 * @param {time_saved_per_day}
 */
 function get_employee_freed(time_saved_per_year,employee_hours_per_day) {
    const employee_working_hours_per_year = 269*employee_hours_per_day;
   /**
    * formulla result = (time_saved_per_year/employee_working_hours_per_year)
    */
   return (time_saved_per_year/employee_working_hours_per_year).toFixed(2);
}



/**
 * @function get_time_saved_per_year
 * @param {time_saved_per_day}
 */
 function get_time_saved_per_year(time_saved_per_day) {
    /**
     * formulla result = no_of_working_days_in_year*time_saved_per_day
     */
    const no_of_working_days_in_year = 269*time_saved_per_day;
    return no_of_working_days_in_year;
 }


/**
 * @function get_time_saved_per_day
 * @param {average_no_of_docs_processed_per_day , time_in_minutes_to_process_single_doc, automation_factor}
 */
 function get_time_saved_per_day(average_no_of_docs_processed_per_day , time_in_minutes_to_process_single_doc, automation_factor) {
   /**
    * formulla result = (average_no_of_docs_processed_per_day*(time_in_minutes_to_process_single_doc/60)*automation_factor)
    */
   return Math.floor((average_no_of_docs_processed_per_day*(time_in_minutes_to_process_single_doc/60)*automation_factor))
}



/**
 * @function get_day_spent_processing_per_employee
 * @param {day_spent_processing_per_employee, average_no_of_docs_processed_per_day , no_of_employees}
 */
 function get_day_spent_processing_per_employee(no_of_docs_processed_per_day_per_employee,employee_hours_per_day,time_in_minutes_to_process_single_doc) {
    /**
     * formulla
     *  day_spent_processing_per_employee = ((no_of_docs_processed_per_day_per_employee*(time_in_minutes_to_process_single_doc/60))/employee_hours_per_day)*100
     */
    return (((no_of_docs_processed_per_day_per_employee*(time_in_minutes_to_process_single_doc/60))/employee_hours_per_day)*100).toFixed(2);
}



/**
 * @function get_no_of_docs_processed_per_day
 * @param {average_no_of_docs_processed_per_day , no_of_employees}
 */
function get_no_of_docs_processed_per_day(average_no_of_docs_processed_per_day , no_of_employees) {
    return (average_no_of_docs_processed_per_day/no_of_employees).toFixed(2);
}





var slider = document.getElementById("automation_factor");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}