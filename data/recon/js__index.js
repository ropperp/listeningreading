/*##############################
||                            ||
||  Infinity Scoll Initial    ||
||                            ||
##############################*/
var active_inf = 0;
var start = 0;
var limit = 20;
var reachedMax = false;

var asend = -1;
var collsend = -1;
var counter = 0;

var format = 0;
var level = 0;
var gers = 0;
var typ = 0;

var audio = 0;
var notschreiben = 0;

var asc = 0;
var spalte = 'sortByDate';
var sprache ='EN';

$(document).ready(function () {
    "+"
    var $parent = $('#result_master');
    $("#spinner_wait").hide();
    $("#swipeDown").hide();
    $("#examplemodal").hide();
    $("#zurueck").hide();

    $("#impressummodal").hide();
    $("#impressummodal").fadeOut();
    $("#examplemodal").fadeOut();
    $("#datenschutzmodal").fadeOut();
    $("#datenschutzmodal").hide();

    $(".control-center").hide();
    $('.btn_sidemenu').on("click", function () {
        $('.btn_sidemenu').toggleClass('close-btn_sidemenu');
        $('.sidebar_cute').toggleClass('sidebar_cute-open');
    });

    //$("#dl_audio").hide();
    
    removeBoxBorder("titel");
    removeBoxBorder("level");
    removeBoxBorder("format");
    removeBoxBorder("gers");
    removeBoxBorder("typ");

    getData(asend, collsend, level, typ, format, gers, spalte, asc);

    if (screen.width < 576) $("#fusszeile").hide();
    else $("#fusszeile").show();
    

    


    /*##############################
    ||                            ||
    ||    Suchanfragen Anfang     ||
    ||                            ||
    ##############################*/


    function search_desk(searchPrio) {
        $("#zurueck").hide();
        $("#swipeDown").hide();
        switch (searchPrio) {
            case 'titel':
                //alert($('#titel').val());
                var query_value = $('#titel').val();
                break;
            default:
                break;
        }
        $('b#search-string').text(query_value);
        $('#liste').fadeOut();
        $(".news").fadeOut();
        if (query_value !== '') {
            $.ajax({
                type: "POST",
                url: "php/search.php",
                data: { query: query_value, searchCase: searchPrio, gate: $("#GateKeeper").data('value'), format: format, level: level, gers: gers, typ: typ },
                cache: false,
                async: true,
                success: function (html) {
                    $(".results").html(html);
                }

            });
        } return false;
    }

    $("#titel").bind('click keyup', function (e) {
        start = 0;
        active_inf = 0;
        var search_string = $(this).val();
        //alert(search_string);
        resetBasketColor();
        //might be removed
        $("#swipeDown").hide();
        setBoxBorder("titel");
        removeBoxBorder("level");
        removeBoxBorder("format");
        removeBoxBorder("gers");
        removeBoxBorder("typ");
        if (search_string == '') {
            asend = -1;
            aname_send = -1;
        } else {
            $("#result_master").html('');
            $("#result_master").fadeIn();

            //Hier wird die Suche aufgerufen
            $(this).data('timer', setTimeout(search_desk("titel"), 100));
        };
    });

    /*##############################
    ||                            ||
    ||    Suchanfragen Ende       ||
    ||                            ||
    ##############################*/

    /*##############################
    ||                            ||
    ||   Suche ausführen Anfang   ||
    ||                            ||
    ##############################*/

    $parent.on('click', '[class*=titel]', function () {
		//alert('titel');
        asend = this.id;
        collsend = -1;
        /*
                alert("asend: " + asend);
                alert("level: " + level);
                alert("typ: " + typ);
                alert("format: " + format);
                alert("gers: " + gers);
        */
        $("#result_master").html("");
        $("#result_master").show();
        getData(asend, collsend, level, typ, format, gers, spalte, asc);
        $("#zurueck").show();
        $(".news").fadeOut();
        $(".control-center").fadeOut();
        $("#swipeDown").hide();
    });
	$parent.on('keyup', '[class*=titel]', function (e) {
		if(e.keyCode == 13){
			this.click();
		}
    });

    /*#######################################
   //                                      //
   //      Spalten sortieren - Anfang      //
   //                                      //
   ########################################*/

    $parent.on('click', '[class*=sortBy]', function () {
        active_inf = 1;
        start = 0;
        limit = 20;
        //alle Pfeile entfernen
        $(".sortById")[0].children[0].classList.remove('fa-arrow-down');
        $(".sortById")[0].children[0].classList.remove('fa-arrow-up');
        $(".sortByDate")[0].children[0].classList.remove('fa-arrow-down');
        $(".sortByDate")[0].children[0].classList.remove('fa-arrow-up');
        $(".sortByName")[0].children[0].classList.remove('fa-arrow-down');
        $(".sortByName")[0].children[0].classList.remove('fa-arrow-up');


        if ($(this).hasClass(spalte)) {
            asc = ++asc % 2;
        } else {
            asc = 0;
            spalte = this.classList.toString();
            spalte = spalte.substring(spalte.indexOf('sortBy'));
        }
        //weiterschicken - für eine korrekte Abfrage
        $("#result_master").html("");
        $("#result_master").show();
        getData(asend, collsend, level, typ, format, gers, spalte, asc);
        $(".news").fadeOut();
        $(".control-center").fadeOut();

    });

	$parent.on('keyup', '[class*=sortById]', function (e) {
		if(e.keyCode==13){
			$(".sortById").trigger("click");
		}
	 });
	 $parent.on('keyup', '[class*=sortByDate]', function (e) {
		if(e.keyCode==13){
			$(".sortByDate").trigger("click");
		}
	 });
	 $parent.on('keyup', '[class*=sortByName]', function (e) {
		if(e.keyCode==13){
			$(".sortByName").trigger("click");
		}
	 });
	 $parent.on('keyup', '[id*=delete]', function (e) {
		// alert('delete');
		// setTimeout(callback, 3000);
		if(e.keyCode == 68 || e.keyCode == 13){
			this.click(),3000;
		}
	 });
	 $parent.on('keyup', '[id*=addTocart_]', function (e) {
		if(e.keyCode == 13){
			this.click();
		}
	 });
	 $("#deleteAll").on("keyup", function (e) {
		 if(e.keyCode == 13){
			document.getElementById('deleteAll').click();
		 }
	 });

	 $("#download1").on("keyup", function (e) {
		 if(e.keyCode == 13){
			document.getElementById('download2').click();
		 }
	 });
	 $("#clSearch").on("keyup", function (e) {
		 if(e.keyCode == 13){
			document.getElementById('clSearch').click();
		 }
	 });
	 $("#addEx").on("keyup", function (e) {
		 if(e.keyCode == 13){
			document.getElementById('addEx').click();
		 }
	 });	 
	 $("#download2").on("click", function (e) {
		 //alert("download2");
		 if(e.keyCode == 28){
			alert("runter");
		 }
	 });

    /*#######################################
   //                                      //
   //      Spalten sortieren - Ende        //
   //                                      //
   ########################################*/

/*    $("#clSearch").on("click", function () {

        $("#result_master").html("");
        //TODO Sprache
        sprache = document.getElementById("GateKeeper").dataset.value;
        window.document.location.href = "index.php?id="+sprache;


    })
*/
    $("#clSearch").on("click", function () {
		start = 0;
        active_inf = 0;
		//dsend = -1;
        //lsend = -1;
        asend = -1;
        collsend = -1;

		format = 0;
		level = 0;
		gers = 0;
		typ = 0;
		
		spalte = 'sortById';
		asc = 0;
		
		if(document.getElementById("typ") != null){
			const $select = document.querySelector('#typ');
			$select.value = '0';
			removeBoxBorder("typ");
		}
		if(document.getElementById("gers") != null){
			const $select = document.querySelector('#gers');
			$select.value = '0'
			//$select.onchange();
			removeBoxBorder("gers");
		}
		if(document.getElementById("level") != null){
			const $select = document.querySelector('#level');
			$select.value = '0';
			//$select.onchange();
			removeBoxBorder("level");
		}
		if(document.getElementById("format") != null){
			const $select = document.querySelector('#format');
			$select.value = '0';
			//$select.onchange();
			removeBoxBorder("format");
		}
		//document.querySelector('#format').change();
		
		document.getElementById("titel").value = "";
		removeBoxBorder("titel");

		getData(asend, collsend, level, typ, format, gers, spalte, asc);
		$("#result_master").html("");
    })

    $("#addEx").on("click", function () {
        
        if (counter != 0) {
            //dsend = -1;
            //lsend = -1;
            asend = -1;
            collsend = 1;
            //sstufe = 0;
            typ = 0;
            isExam = 0;
            active_inf = 0;
            if (counter > 0) {
				start = 0;
                this.children[0].classList.add('inBasket');
                this.children[1].classList.add('bg-inBasket');
            }
            $("#result_master").html('');
            getData(asend, collsend, level, typ, format, gers, spalte, asc);
            $(".news").fadeOut();
            $(".control-center").show();

        } else {
            alert("Wählen Sie bitte mindestens eine Aufgabe aus.");
        }
    });


    /*##############################
    ||                            ||
    ||   Suche ausführen ENDE     ||
    ||                            ||
    ##############################*/
    //***********   ***** ***** **************************** ****************** ********* */
    //***********   ***** ***** **************************** ****************** ********* */
    //***********   ***** ***** **************************** ****************** ********* */
    //***********   ***** ***** **************************** ****************** ********* */
    //***********   ***** ***** **************************** ****************** ********* */
    //***********   ***** ***** **************************** ****************** ********* */

    $('#level').on('change', function () {
        active_inf = 1;
        start = 0;
        collsend = -1

        level = this.value;
        asend = -1;

        removeBoxBorder("titel");
        setBoxBorder("level");
        setBoxBorder("format");
        setBoxBorder("gers");
        setBoxBorder("typ");
        $("#zurueck").hide();
        $("#result_master").html('');
        $(".news").fadeOut();
        $(".control-center").fadeOut();

        getData(asend, collsend, level, typ, format, gers, spalte, asc);
    });

    $('#level').on('click', function () {
        removeBoxBorder("titel");
        setBoxBorder("level");
        setBoxBorder("format");
        setBoxBorder("gers");
        setBoxBorder("typ");
        if (collsend == 1) {
            $(".control-center").fadeOut();
            active_inf = 1;
            start = 0;
            collsend = -1;
            asend = -1;
            resetBasketColor();
            $("#result_master").html('');
            $(".news").fadeOut();
            getData(asend, collsend, level, typ, format, gers, spalte, asc);
        }
    })
	$('#level').on('keyup', function (e) {
		removeBoxBorder("titel");
        setBoxBorder("level");
        removeBoxBorder("format");
        removeBoxBorder("gers");
        removeBoxBorder("typ");
    })
	$('#format').on('keyup', function (e) {
		removeBoxBorder("titel");
        removeBoxBorder("level");
        setBoxBorder("format");
        removeBoxBorder("gers");
        removeBoxBorder("typ");
    })
	$('#gers').on('keyup', function (e) {
		removeBoxBorder("titel");
        removeBoxBorder("level");
        removeBoxBorder("format");
        setBoxBorder("gers");
        removeBoxBorder("typ");
    })
	$('#typ').on('keyup', function (e) {
		removeBoxBorder("titel");
        removeBoxBorder("level");
        removeBoxBorder("format");
        setBoxBorder("typ");
        removeBoxBorder("gers");
    })
    /** dropdown with checkbox **/

    $(".checkbox-menu").on("change", "input[type='checkbox']", function () {
        $(this).closest("li").toggleClass("active", this.checked);
    });

    $(document).on('click', '.allow-focus', function (e) {
        e.stopPropagation();
    });

    $('#typ').on('change', function () {

        active_inf = 1;
        start = 0;
        collsend = -1
        removeBoxBorder("titel");
        setBoxBorder("level");
        setBoxBorder("format");
        setBoxBorder("gers");
        setBoxBorder("typ");

        typ = this.value;
        asend = -1;
        $("#zurueck").hide();
        $(".control-center").fadeOut();
        $(".news").fadeOut();
        $(".news").hide();
        $("#result_master").html('');
        $("#result_master").show();
        getData(asend, collsend, level, typ, format, gers, spalte, asc);
        $(".news").fadeOut();

    });

    $('#typ').on('click', function () {
        if (collsend == 1) {
            active_inf = 1;
            start = 0;
            collsend = -1;
            removeBoxBorder("titel");
            setBoxBorder("level");
            setBoxBorder("format");
            setBoxBorder("gers");
            setBoxBorder("typ");
            resetBasketColor();
            $("#result_master").html('');
            $("#result_master").show();
            $(".news").fadeOut();
            getData(asend, collsend, level, typ, format, gers, spalte, asc);
        }
    })

    $('#format').on('change', function () {

        active_inf = 1;
        start = 0;
        collsend = -1;

        removeBoxBorder("titel");
        setBoxBorder("level");
        setBoxBorder("format");
        setBoxBorder("gers");
        setBoxBorder("typ");

        format = this.value;
        asend = -1;
        $("#zurueck").hide();
        $(".control-center").fadeOut();
        $(".news").fadeOut();
        $(".news").hide();
        $("#result_master").html('');
        $("#result_master").show();
        getData(asend, collsend, level, typ, format, gers, spalte, asc);
        $(".news").fadeOut();

    });

    $('#format').on('click', function () {
        if (collsend == 1) {
            active_inf = 1;
            start = 0;
            collsend = -1;
            removeBoxBorder("titel");
            setBoxBorder("level");
            setBoxBorder("format");
            setBoxBorder("gers");
            setBoxBorder("typ");

            resetBasketColor();
            $("#result_master").html('');
            $("#result_master").show();
            $(".news").fadeOut();
            getData(asend, collsend, level, typ, format, gers, spalte, asc);
        }
    })

    $('#gers').on('change', function () {

        active_inf = 1;
        start = 0;
        collsend = -1
        removeBoxBorder("titel");
        setBoxBorder("level");
        setBoxBorder("format");
        setBoxBorder("gers");
        setBoxBorder("typ");
        if(this.value == 4){
            //alle anzeigen
            $('option.s').show();
            $('option.lh').hide();
            $('option.sik').hide();
            $('option.lhsik').hide();
            $('option.l').hide();
        } else if(this.value == 3){
            $('option.s').hide();
            $('option.lh').hide();
            $('option.sik').show();
            $('option.lhsik').show();
            $('option.l').hide();
        } else if(this.value == 2){
            $('option.s').hide();
            $('option.lh').show();
            $('option.sik').hide();
            $('option.lhsik').show();
            $('option.l').hide();
        }  else if(this.value == 1){
            $('option.s').hide();
            $('option.lh').show();
            $('option.sik').hide();
            $('option.lhsik').show();
            $('option.l').show();
        } else {
                $('option.s').show();
                $('option.lh').show();
                $('option.sik').show();
                $('option.lhsik').show();
                $('option.l').show();
            
        }

        gers = this.value;
        asend = -1;
        $("#zurueck").hide();
        $(".control-center").fadeOut();
        $(".news").fadeOut();
        $(".news").hide();
        $("#result_master").html('');
        $("#result_master").show();
        getData(asend, collsend, level, typ, format, gers, spalte, asc);
        $(".news").fadeOut();

    });

    $('#gers').on('click', function () {
        if (collsend == 1) {
            active_inf = 1;
            start = 0;
            collsend = -1;
            removeBoxBorder("titel");
            setBoxBorder("level");
            setBoxBorder("format");
            setBoxBorder("gers");
            setBoxBorder("typ");

            resetBasketColor();
            $("#result_master").html('');
            $("#result_master").show();
            $(".news").fadeOut();
            getData(asend, collsend, level, typ, format, gers, spalte, asc);
        }
    })

    $('#loadMore_Button').on('click', function () {
        getData(asend, collsend, level, typ, format, gers, spalte, asc);
    });



    /*##############################
    ||                            ||
    ||  ShoppingCart    Anfang    ||
    ||                            ||
    ##############################*/


    $("#addEx").data('name', '');
    var counter = 0;
    
    $parent.on('click', '[id*=addTocart_]', function (e) {
        //start=0;
        //Zugriff zum Modal
        var myId = this.id.toString();
        idNr = myId.substr(myId.indexOf('_') + 1);
        var myModal = document.getElementById("detailAufgabe" + idNr);
        myModal = myModal.getElementsByClassName('addToCart');
        var text = document.getElementById('fertigk'+idNr).innerHTML;

        tmp = $(this).data('value').replaceAll(":"," - ");
        tmp = tmp.replaceAll("<br>","");
        tmparr=tmp.split(";");

        if ((this.checked == null && $(this).hasClass('active')) || this.checked) {
            var content = $("#addEx").data('name').toString();
            content += ":";

            if(document.getElementById('collA').value != '') document.getElementById('collA').value += ":";
            document.getElementById('collA').value += tmparr[2];
            if(document.getElementById('collL').value != '') document.getElementById('collL').value += ":";
            document.getElementById('collL').value += tmparr[2]; 
            //alert(document.getElementById('collA').value + " " + document.getElementById('collL').value);
            content += tmp;

            content = $("#addEx").data('name').toString();
            content += ":";
            content += $(this).data('value').replaceAll(":"," - ");
            content = content.replaceAll("&"," et ");
            $("#addEx").data('name', content);
            myModal[0].classList.remove('active');
            myModal[0].classList.remove('fakeLink');
            myModal[0].classList.add('fakeLinkUsed');

            document.getElementById(myId).checked = true;
            counter++;
            if(text.match("Schreiben") == null) notschreiben++;
            if(text.match("Hören") != null) audio++;



        } else {
            var toDelete = ':' + $(this).data('value');
            var collVal = document.getElementById('collA').value;
            var actualaddEx = $("#addEx").data('name').toString();
            $("#addEx").data('name', actualaddEx.replace(toDelete, ''));
            if(collVal.indexOf(":"+tmparr[2]) != -1) {
                toDelete = ":"+tmparr[2];
            } else {
                toDelete = tmparr[2];
            }
            
            collVal = collVal.replace(toDelete, '');
            document.getElementById('collA').value = collVal;
            document.getElementById('collL').value = collVal;

            myModal[0].classList.add('active');
            myModal[0].classList.add('fakeLink');
            myModal[0].classList.remove('fakeLinkUsed');

            document.getElementById(myId).checked = false;

            if (counter > 0) counter--;
            if(text.match("Schreiben") == null) notschreiben--;
            if(text.match("Hören") != null && audio > 0) audio--;
        }
        if (counter > -1) {
            $("#cart_badge").html(counter);
        }

        $("#cart_badge").html(counter);

    });

    $parent.on('click', '[id*=selectAll]', function (e) {
        var last = "";
       

        active_inf = 1;
        $.each($('.addToCart:checked'), function () {
            this.click();
        });

        if ($(e.target).prop('checked')) {
            $(".addToCart").each(function () {

                if (this.id == last) {
                } else {
                    this.click();
                    last = this.id;
                }
            });
        }
        $(".news").fadeOut();

    })
    /*##############################
    ||                            ||
    ||  ShoppingCart    Ende      ||
    ||                            ||
    ##############################*/
    /*##############################
    ||                            ||
    ||  ShoppingCart Item löschen ||
    ||                            ||
    ##############################*/
    $parent.on('click', '[id*=delete]', function (e) {
        var toDelete = ':' + $(this).data('value');
        var actualaddEx = $("#addEx").data('name').toString();
        $("#addEx").data('name', actualaddEx.replace(toDelete, ''));
        start = 0;
        asend = -1;
        collsend = 1;
        active_inf = 0;
        //alert(query_value);
        $("#result_master").html("");
        $("#result_master").show();
        if (counter > 0) counter--;
        var res = $("#addEx").data('name').split(":");
        if ((res.length - 1) <= 0) {
            $("#cart_badge").html("0");
        } else {
            $("#cart_badge").html(counter);
        }
        getData(asend, collsend, level, typ, format, gers, spalte, asc);
        $(".news").fadeOut();
        $(".control-center").show();

    });
    /*####################################
    ||                                  ||
    ||  ShoppingCart alle Items löschen ||
    ||                                  ||
    #####################################*/
    $("#deleteAll").on("click", function () {
        if (counter != 0) {
            //start = 0;
            active_inf = 0;
            audio = 0;
            notschreiben = 0;

            counter = 0;
            $("#addEx").data('name', '');
            document.getElementById('collA').value ='';
            document.getElementById('collL').value ='';
            $("#cart_badge").html(counter);
            $(".news").fadeOut();

            if (collsend != 1) {
                $("#addEx").data('name', '');
                $.each($('.addToCart:checked'), function () {
                    $(this).addClass('active');
                    this.click();
                });
                document.getElementById('selectAll').checked = false;
            } else {
                $.each($('.overlay'), function () {
                    this.click();
                });
                document.getElementById('aTyp').click();
            }
        }
    });


    /*##############################
    ||                            ||
    ||  Infinity Scroll Anfang    ||
    ||                            ||
    ##############################*/
    //News werden ausgeblendet wenn alle Aufgaben angezeigt werden sollen ANFANG
    /*$(".showall").bind('click', function (e) {
        start = 0;
        dsend = -1;
        lsend = -1;
        asend = -1;
        collsend = -1;
        active_inf = 1;
        $("#result_master").html("");
        $("#result_master").show();
        getData(asend, collsend, level, typ, format, gers, spalte, asc);
        $(".news").fadeOut();
        $(".control-center").fadeOut();
    });*/
    //News werden ausgeblendet wenn alle Aufgaben angezeigt werden sollen ENDE
    /*##############################
    ||                            ||
    ||  Infinity Scroll Ende      ||
    ||                            ||
    ##############################*/


    /*##############################
    ||                            ||
    ||     Back to top Anfang     ||
    ||                            ||
    ##############################*/
    var back_to_top_button = ['<button type="button" class="back-to-top btn btn-rounded btn-icon"><i class="fa fa-arrow-up fa-inverse" aria-hidden="true"></i></button>'].join("");
    $("body").append(back_to_top_button)

    // Der Button wird ausgeblendet
    $(".back-to-top").hide();

    // Funktion für das Scroll-Verhalten
    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) { // Wenn 100 Pixel gescrolled wurde
                $('.back-to-top').fadeIn();
            } else {
                $('.back-to-top').fadeOut();
            }
        });

        $('.back-to-top').click(function () { // Klick auf den Button
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    });

    /*##############################
    ||                            ||
    ||     Back to top Ende     ||
    ||                            ||
    ##############################*/
    //***********   ***** ***** **************************** ****************** ********* */

    /*##############################
    ||                            ||
    ||     Export   Anfang        ||
    ||                            ||
    ##############################*/
    $('.dl_aufgabe').on("click", function () {
        /*var query_send = $("#addEx").data('name');
        if (query_send != '') window.open('php/pdf_aufgaben.php?coll=' + query_send + ';\&l=n', '_blank'); 
        */
        //document.getElementById('coll').value = $("#addEx").data('name');
        if(document.getElementById('collA').value != ""){
            //alert(document.getElementById('collA').value);
            document.getElementById('export').click();
            document.getElementById('exportAufgaben').submit();
        } else {
            alert("Wählen Sie bitte eine Aufgabe aus.");
            document.getElementById('wAnzahl').click();
        }
    });
    /*$('.dl_loesung').on("click", function () {
        var query_send = $("#addEx").data('name');
        if (query_send != '' && notschreiben > 0) {
            window.open('php/pdf_loesungen.php?coll=' + query_send + ';\&l=n', '_blank');
        } else {
            alert("Wählen Sie bitte eine Aufgabe mit Lösung (alle außer jene mit Fertigkeit Schreiben) aus.");
            document.getElementById('typ').click();
        }
    });*/
    $('.dl_loesung').on("click", function () {
        if(document.getElementById('collL').value != "" && notschreiben > 0){
            document.getElementById('export').click();
            document.getElementById('exportLoesungen').submit();
        } else {
            alert("Wählen Sie bitte eine Aufgabe mit Lösung (alle außer jene mit Fertigkeit Schreiben) aus.");
            document.getElementById('wAnzahl').click();
        }
    });
    $(".dl_audio").on("click", function () {
        var query_send = $("#addEx").data('name');
        //alert(query_send);
        if (query_send != '' && audio > 0 && audio <21){
             window.open('php/zip_audio.php?coll=' + query_send + ';\&l=n', '_blank');
        } else {
            if(audio > 20){
                alert("Wählen Sie bitte höchstens 20 Aufgaben mit Audio aus.");
            } else {
                alert("Wählen Sie bitte mindestens eine Aufgabe mit Audio aus.");
            }
            document.getElementById('typ').click();
        }
    });

});
/*##############################
||                            ||
||     Export   Ende          ||
||                            ||
##############################*/
//infinity Scroll Hole die nächsten 20 Aufgaben hinein ANFANG
//Startvariablen ganz oben erste Zeilen


function resetBasketColor() {
    document.getElementById("addEx").children[0].classList.remove('inBasket');
    document.getElementById("addEx").children[1].classList.remove('bg-inBasket');
}
function hideBack() {
    $("#zurueck").fadeOut();
}
function showBack() {
    $("#zurueck").show();
}
function hideSwiper() {
    $("#swipeDown").fadeOut();
    document.getElementById("addEx").children[0].classList.remove('inBasket');
}
function showSwiper() {
    $("#swipeDown").show();
}
function hideSwiper2() {
    $("#swipeDown").hide();
}

function setBoxBorder(boxName) {
    //document.getElementById(boxName).style.borderColor = "#08298A"; 
    document.getElementById(boxName).style.borderColor = "#c0d1e8";
    document.getElementById(boxName).style.boxShadow = "inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 0 0.2rem #c0d1e8";
}

function removeBoxBorder(boxName) {
    document.getElementById(boxName).style.borderColor = "#ced4da";
    document.getElementById(boxName).style.boxShadow = "inset 0 1px 1px rgba(0, 0, 0, 0.075)";
}

function getData(aname_send, collsend, level, typ, format, gers, spalte, asc) {
    var query_send = $("#addEx").data('name');
    $.ajax({
        url: 'php/results.php', //Abfrage alle Aufgaben
        method: 'POST',
        dataType: 'text',
        data: {
            getData: 1,
            start: start,
            limit: limit,
            aname_send: aname_send,
            coll_send: collsend,
            coll: query_send,
            gate: $("#GateKeeper").data('value'),
            level: level,
            typ: typ,
            format: format,
            gers: gers,
            spalte: spalte,
            asc: asc
        },
        success: function (response) {
            if (response.toString() == "reachedMax") {
                $("#swipeDown").hide();
            }
            else {
                if (reachedMax) {
                    reachedMax = false;
                }
                else {
                    start += limit;
                    if (collsend == 1) {
                        $("#result_master").html(response);
                    } else {
                        $("#result_master").append(response);
                        $("#result_master").show(response);
                    }
                }
            }
        }
    });
}


