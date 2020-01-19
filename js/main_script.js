var dojo_name = ["安曇野","松本","上田","塩尻","諏訪子","茅野","伊那"];
    
$(function(){
    console.log("load!");

    load_dojo_name();
});

//dojoロード処理
function load_dojo_name(){
    $("#dojo_name_id").append('<option value="null">Dojo名を指定してください</option>');
    for(var i = 0;i < dojo_name.length;i++){
        $("#dojo_name_id").append('<option value="' + i + '">' + dojo_name[i] + "</option>");
    }
}

//送信処理
$("#create_submit_id").click(function(){

    console.log("==========================================");
    var now_date = new Date();

    var dojo_name = $("#dojo_name_id").val();
    var open_day_date_id = $("#open_day_date_id").val();
    var open_start_time_id = $("#open_start_time_id").val();
    var open_end_time_id = $("#open_end_time_id").val();
    var venue_point_id = $("#venue_point_id").val();
    var dojo_emotion_id = $("#dojo_emotion_id").val();
    var pc_bring_in_id = $("#pc_Bring_in_id").val();
    var organizer_name_id = $("#organizer_name_id").val();
    var application_url_id = $("#application_url_id").val();

    //===========================================================
    if(dojo_name == "null"){
        console.log("dojo_name Error!");
    }

    //===========================================================
    if(open_day_date_id == ""){
        console.log("open_day_date_id Error!");
    }else{
        var date_flag = false;
        var time_start_flag = false;
        var time_end_flag = false;
        var time_flag = false;

        var chas_date = new Date(open_day_date_id);
        
        var chas_year_A = chas_date.getFullYear();
        var chas_mon_A = chas_date.getMonth();
        var chas_day_A = chas_date.getDate();

        var chas_year_B = now_date.getFullYear();
        var chas_mon_B = now_date.getMonth();
        var chas_day_B = now_date.getDate();

        if(chas_year_A == chas_year_B){
            if(chas_mon_A == chas_mon_B){
                date_flag = chas_day_B < chas_day_A
            }else{
                date_flag = chas_mon_B < chas_mon_A
            }
        }else{
            date_flag = chas_year_B < chas_year_A;
        }

        if(date_flag == false){
            console.log("open_day_date_id Past designation Error!");
        }
    }

    //===========================================================
    if(open_start_time_id == ""){
        console.log("open_start_time_id Error!");
    }else{
        time_start_flag = true;
    }

    if(open_end_time_id == ""){
        console.log("open_end_time_id Error!");
    }else{
        time_end_flag = true;
    }

    if(time_start_flag == true && time_end_flag == true){
        var chas_time_array_A = open_start_time_id.split(':');
        var chas_time_array_B = open_end_time_id.split(':');

        if(parseInt(chas_time_array_A[0],10) == parseInt(chas_time_array_B[0],10)){
            time_flag = parseInt(chas_time_array_A[1],10) < parseInt(chas_time_array_B[1],10);
        }else{
            time_flag = parseInt(chas_time_array_A[0],10) < parseInt(chas_time_array_B[0],10);
        }
    }

    if(time_flag == false){
        console.log("open_start_time_id Past designation Error!")
    }

    //===========================================================
    if(pc_bring_in_id == "null"){
        console.log("pc_bring_in_id Error!");
    }

    //===========================================================
    if(organizer_name_id ==""){
        console.log("organizer_name_id Error!");
    }

    //===========================================================
    if(application_url_id == ""){
        console.log("application_url_id Error!");
    }

    return false;
});