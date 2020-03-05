var dojo_name_temp = [
    "安曇野",
    "松本",
    "上田",
    "塩尻",
    "諏訪湖",
    "伊那"
  ];
  
  var content_number = 9;
  var gengou_number = 2018;
  var gengou_string = "令和";
  var yser_split_number = 2000;
  var week_str = ["日", "月", "火", "水", "木", "金", "土"];
  var chas_date_array;
  
  $(function() {
    console.log("load!");
  
    var storage_result = localStorage.getItem("Save_Date");
  
    load_dojo_name();
    if (storage_result == null) {
      load_reset();
      load_temp();
    } else {
      load_date();
    }
  });
  
  //dojoロード処理
  function load_dojo_name() {
    $("#dojo_name_id").append(
      '<option value="null">Dojo名を指定してください</option>'
    );
    for (var i = 0; i < dojo_name_temp.length; i++) {
      $("#dojo_name_id").append(
        '<option value="' + i + '">' + dojo_name_temp[i] + "</option>"
      );
    }
  }
  
  function load_reset() {
    $("#dojo_name_id").val("null");
    $("#view_type_id").val("null");
  }
  
  //テンプレートロード
  function load_temp() {
    var temp_event =
      "曜日：@Open_day<br>\n" +
      "時間：@Start_time ～ @Close_time<br>\n" +
      "場所：@Open_venue<br>\n" +
      "対象：小学1年生～高校3年生<br>\n" +
      "持ち物：ノートPC　@Bring_in<br>\n" +
      "参加費：無料<br>\n" +
      "お申し込み先：@App_url<br>\n" +
      "主催：CoderDojo@Dojo_name (運営者：@Org_name)<br>";
  
    var temp_mentor =
      "皆様お疲れ様です！CoderDojo@Dojo_nameの@Org_nameです<br>\n" +
      "今月のCoderDojo@Dojo_nameは<br>\n" +
      "曜日：@Open_day<br>\n" +
      "時間：@Start_time ～ @Close_time<br>\n" +
      "場所：@Open_venue<br>\n" +
      "にて行います。<br>\n" +
      "どしどし参加してください！！<br>";
  
    var temp_SNS =
      "///CoderDojo@Dojo_name 開催のお知らせ///<br>\n" +
      "今月のCoderDojo@Dojo_nameは@Open_day<br>\n";
  
    $("#template_event_setting").val(temp_event);
    $("#template_mentor_setting").val(temp_mentor);
    $("#template_SNS_setting").val(temp_SNS);
  }
  
  //保存データ読み込み
  function load_date() {
    var save_date = JSON.parse(localStorage.getItem("Save_Date"));
  
    if (save_date["Dojo_name"] == "null") {
      $("#dojo_name_id").val("null");
    } else {
      var chas_number = parseInt(save_date["Dojo_name"]);
      $("#dojo_name_id").val(chas_number);
    }
  
    if (save_date["View_type"] == "null") {
      $("#view_type_id").val("null");
    } else {
      var chas_number = parseInt(save_date["View_type"]);
      $("#view_type_id").val(chas_number);
    }
  
    $("#open_start_time_id").val(save_date["Start_time"]);
    $("#open_end_time_id").val(save_date["Close_time"]);
    $("#venue_point_id").val(save_date["Open_venue"]);
    $("#dojo_emotion_id").val(save_date["A_word"]);
    $("#pc_Bring_in_id").val(save_date["Bring_in"]);
    $("#organizer_name_id").val(save_date["Org_name"]);
    $("#application_url_id").val(save_date["App_url"]);
  
    $("#template_event_setting").val(save_date["Event_temp"]);
    $("#template_mentor_setting").val(save_date["Mentor_temp"]);
    $("#template_SNS_setting").val(save_date["SNS_temp"]);
  }
  
  //送信処理
  $("#create_submit_id").click(function() {
    console.log("==========================================");
    var now_date = new Date();
    var date_flag = false;
    var time_start_flag = false;
    var time_end_flag = false;
    var time_flag = true;
    var Error_flag = true;
    var insert_array = new Array(content_number);
    var error_list = new Array();
  
    var dojo_name = $("#dojo_name_id").val();
    var open_day_date_id = $("#open_day_date_id").val();
    var open_start_time_id = $("#open_start_time_id").val();
    var open_end_time_id = $("#open_end_time_id").val();
    var venue_point_id = $("#venue_point_id").val();
    var dojo_emotion_id = $("#dojo_emotion_id").val();
    var pc_bring_in_id = $("#pc_Bring_in_id").val();
    var organizer_name_id = $("#organizer_name_id").val();
    var application_url_id = $("#application_url_id").val();
    var view_type_id = $("#view_type_id").val();
  
    insert_array[0] = dojo_name_temp[dojo_name];
    insert_array[2] = open_start_time_id;
    insert_array[3] = open_end_time_id;
    insert_array[4] = venue_point_id;
    insert_array[5] = dojo_emotion_id;
    insert_array[6] = pc_bring_in_id;
    insert_array[7] = organizer_name_id;
    insert_array[8] = application_url_id;
  
    //===========================================================
    if (dojo_name == "null") {
      error_list.push(1000);
      Error_flag = false;
    }
  
    //===========================================================
    if (open_day_date_id == "") {
      error_list.push(1001);
      Error_flag = false;
    } else {
      var chas_date = new Date(open_day_date_id);
  
      var chas_year_A = chas_date.getFullYear();
      var chas_mon_A = chas_date.getMonth();
      var chas_day_A = chas_date.getDate();
      var chas_week_A = chas_date.getDay();
  
      var chas_year_B = now_date.getFullYear();
      var chas_mon_B = now_date.getMonth();
      var chas_day_B = now_date.getDate();
  
      if (chas_year_A == chas_year_B) {
        if (chas_mon_A == chas_mon_B) {
          date_flag = chas_day_B < chas_day_A;
        } else {
          date_flag = chas_mon_B < chas_mon_A;
        }
      } else {
        date_flag = chas_year_B < chas_year_A;
      }
  
      if (date_flag == false) {
        Error_flag = false;
        error_list.push(1002);
      }
  
      var chas_date_str = "";
      chas_mon_A++;
    }
  
    //===========================================================
    console.log(view_type_id);
  
    switch (view_type_id) {
      case "null":
        console.log("view_type_id Error!");
        error_list.push(1003);
        Error_flag = false;
        break;
      case "0":
        chas_date_str = chas_year_A + "/" + chas_mon_A + "/" + chas_day_A;
        break;
      case "1":
        chas_date_str =
          chas_year_A + "年" + chas_mon_A + "月" + chas_day_A + "日"+
          "(" +
          week_str[chas_week_A] +
          ")";;
        break;
      case "2":
        chas_date_str = chas_mon_A + "月" + chas_day_A + "日";
        break;
      case "3":
        chas_date_str =
          gengou_string +
          (chas_year_A - gengou_number) +
          "年" +
          chas_mon_A +
          "月" +
          chas_day_A +
          "日";
        break;
      case "4":
        chas_date_str =
          chas_year_A -
          yser_split_number +
          "/" +
          chas_mon_A +
          "/" +
          chas_day_A +
          "(" +
          week_str[chas_week_A] +
          ")";
        break;
      case "5":
        chas_date_str =
          chas_year_A +
          "/" +
          chas_mon_A +
          "/" +
          chas_day_A +
          " " +
          week_str[chas_week_A] +
          "曜日";
        break;
    }
  
    insert_array[1] = chas_date_str;
  
    //===========================================================
    if (open_start_time_id == "") {
      error_list.push(1004);
      Error_flag = false;
    } else {
      time_start_flag = true;
    }
  
    if (open_end_time_id == "") {
      error_list.push(1005);
      Error_flag = false;
    } else {
      time_end_flag = true;
    }
  
    if (time_start_flag == true && time_end_flag == true) {
      var chas_time_array_A = open_start_time_id.split(":");
      var chas_time_array_B = open_end_time_id.split(":");
  
      if (
        parseInt(chas_time_array_A[0], 10) == parseInt(chas_time_array_B[0], 10)
      ) {
        time_flag =
          parseInt(chas_time_array_A[1], 10) < parseInt(chas_time_array_B[1], 10);
      } else {
        time_flag =
          parseInt(chas_time_array_A[0], 10) < parseInt(chas_time_array_B[0], 10);
      }
    }
  
    if (time_flag == false) {
      error_list.push(1006);
      Error_flag = false;
    }
  
    //===========================================================
    if (organizer_name_id == "") {
      error_list.push(1007);
      Error_flag = false;
    }
  
    //===========================================================
    if (application_url_id == "") {
      error_list.push(1008);
      Error_flag = false;
    }
  
    console.log(Error_flag);
  
    if (Error_flag == false) {
      error_alert(error_list);
    }
  
    create_template(Error_flag, insert_array);
  
    return false;
  });
  
  function create_template(Error_flag, insert_array) {
    if (Error_flag == false) {
      return;
    }
    /*===============================
      @Dojo_name  = Dojo名
      @Open_day   = 開催日時
      @Start_time = 開始時間
      @Close_time = 終了時間
      @Open_venue = 開催地
      @A_word     = 熱意を一言
      @Bring_in   = PCの持ち込み
      @Org_name    = 主催者名
      @App_url    = 申し込みURL
      =================================*/
    var content_array = [
      "@Dojo_name",
      "@Open_day",
      "@Start_time",
      "@Close_time",
      "@Open_venue",
      "@A_word",
      "@Bring_in",
      "@Org_name",
      "@App_url"
    ];
  
    var event_temp = $("#template_event_setting").val();
    var mentor_temp = $("#template_mentor_setting").val();
    var SNS_temp = $("#template_SNS_setting").val();
  
    chas_date_array = [event_temp, mentor_temp, SNS_temp];
  
    while (true) {
      var serch_flag = false;
      for (var i = 0; i < chas_date_array.length; i++) {
        for (var c = 0; c < insert_array.length; c++) {
          chas_date_array[i] = chas_date_array[i].replace(
            content_array[c],
            insert_array[c]
          );
        }
      }
  
      for (var i = 0; i < chas_date_array.length; i++) {
        for (var c = 0; c < insert_array.length; c++) {
          var serch_result = chas_date_array[i].indexOf(content_array[c]);
          if (serch_result !== -1) {
            serch_flag = true;
          }
        }
      }
  
      if (serch_flag == false) {
        break;
      }
    }
  
    console.log(chas_date_array[0]);
    $("#generator_event_id").empty();
    $("#generator_mentor_id").empty();
    $("#generator_SNS_id").empty();
  
    $("#generator_event_id").append(chas_date_array[0]);
    $("#generator_mentor_id").append(chas_date_array[1]);
    $("#generator_SNS_id").append(chas_date_array[2]);
  }
  
  $("#event_temp_copy").click(function() {
    click_copy("generator_event_id");
  });
  $("#mentor_temp_copy").click(function() {
    click_copy("generator_mentor_id");
  });
  $("#SNS_temp_copy").click(function() {
    click_copy("generator_SNS_id");
  });
  
  function click_copy(main_id) {
    var chas_id = document.getElementById(main_id);
    var chas_copy_data = document.createRange();
  
    window.getSelection().empty();
  
    chas_copy_data.selectNode(chas_id);
    window.getSelection().addRange(chas_copy_data);
    document.execCommand("copy");
  }
  
  function error_alert(error_code_array) {
    /*===============================
      1000    = dojo名未選択
      1001    = 開催日未選択
      1002    = 開催日が過去のもの
      1003    = 表示形式が未選択
      1004    = 開始時間が未選択
      1005    = 終了時間が未選択
      1006    = 終了時間が開催時間より過去のものを指定
      1007    = 主催者名が未記入
      1008    = 申し込みURLが未挿入
      =================================*/
        var chas_str = "";
      var error_content = ["dojo名が未選択です！",
                          "開催日が未選択です！",
                          "開催日が過去のものです！",
                          "表示形式が未選択です！",
                          "開始時間が未選択です！",
                          "終了時間が未選択です！",
                          "終了時間が開催時間より過去のものを指定しています！",
                          "主催者名が未記入です！",
                          "申し込み先が未記入です！"];
    console.log(error_code_array);
        for(var i = 0;i < error_code_array.length;i++){
          switch(error_code_array[i]){
            case 1000:
              chas_str = chas_str + error_content[0] + "\n";
              break;
           case 1001:
              chas_str = chas_str + error_content[1] + "\n";
              break;
           case 1002:
              chas_str = chas_str + error_content[2] + "\n";
              break;
           case 1003:
              chas_str = chas_str + error_content[3] + "\n";
              break;
           case 1004:
              chas_str = chas_str + error_content[4] + "\n";
              break;
           case 1005:
              chas_str = chas_str + error_content[5] + "\n";
              break;
           case 1006:
              chas_str = chas_str + error_content[6] + "\n";
              break;
          case 1007:
              chas_str = chas_str + error_content[7] + "\n";
              break;
          case 1008:
              chas_str = chas_str + error_content[8] + "\n";
              break;
          } 
        }
        alert(chas_str);
  }
  
  $("#storage_save_id").click(function() {
    var dojo_name = $("#dojo_name_id").val();
    var open_start_time_id = $("#open_start_time_id").val();
    var open_end_time_id = $("#open_end_time_id").val();
    var venue_point_id = $("#venue_point_id").val();
    var dojo_emotion_id = $("#dojo_emotion_id").val();
    var pc_bring_in_id = $("#pc_Bring_in_id").val();
    var organizer_name_id = $("#organizer_name_id").val();
    var application_url_id = $("#application_url_id").val();
    var view_type_id = $("#view_type_id").val();
  
    var event_temp = $("#template_event_setting").val();
    var mentor_temp = $("#template_mentor_setting").val();
    var SNS_temp = $("#template_SNS_setting").val();
  
    var save_obje = {
      Dojo_name: dojo_name,
      View_type: view_type_id,
      Start_time: open_start_time_id,
      Close_time: open_end_time_id,
      Open_venue: venue_point_id,
      A_word: dojo_emotion_id,
      Bring_in: pc_bring_in_id,
      Org_name: organizer_name_id,
      App_url: application_url_id,
      Event_temp: event_temp,
      Mentor_temp: mentor_temp,
      SNS_temp: SNS_temp
    };
  
    var save_json = JSON.stringify(save_obje);
    localStorage.setItem("Save_Date", save_json);
  });
  
  $("#storage_remove_id").click(function() {
    localStorage.removeItem("Save_Date");
    localStorage.clear();
  });
  
  $("#defult_temp_load_id").click(function() {
    load_temp();
  });
  