angular.module("RedePga",["ngSanitize","ngFileUpload","highcharts-ng","ngTagsInput","masonry","ui.sortable"]),$(document).ready(function(){$(".button-collapse").sideNav(),$(".dropdown-button").on("click",function(){setTimeout(function(){$("#slide-out").scrollTop(99999)},300)}),$(".dropdown-button").dropdown({inDuration:300,outDuration:225,constrain_width:!0,gutter:0,belowOrigin:!0,alignment:"left"}),$(".collapsible").collapsible({accordion:!1})}),angular.module("RedePga").controller("TrocarSenhaCtrl",["$scope",function(e){e.formValido=!1,e.$watch("user.confirm_new_password",function(t){t==e.user.new_password?e.formValido=!0:e.formValido=!1})}]).controller("ApplicationCtrl",["$scope","$http",function(e,t){e.usuarioAtual=function(t){if("tipoDeAtor"==t){var o={dad:"Pai",mom:"Mãe",tutor:"Tutor",therapist:"Terap.",mediator:"Mediad.",coordinator:"Coord.",user:"Est."};return o[e.usuarioLogado.role]}return e.usuarioLogado[t]}}]).controller("FeedCtrl",["$scope","Feed","$window","$timeout",function(e,t,o,a){e.lessons=[],t.fetch_all(o.location.search).then(function(t){e.lessons=t.data},function(){alert("Ocorreu um erro ao carregar os exercícios do site!")}),e.reset_search=function(){e.search.$=""},e.role_helper=function(e){var t={dad:"Pai",mom:"Mãe",tutor:"Tutor",therapist:"Terap.",mediator:"Mediad.",coordinator:"Coord.",user:"Est."};return t[e]},e.materiaAtual=!1,e.mostrarMateria=function(t){0==e.materiaAtual?e.materiaAtual=t:e.materiaAtual=!1},e.mostrarDados=function(t,o){null!=t?e.mostrar=t:o.length>0&&(first=o[Object.keys(o)[0]],e.mostrar=first.role)}}]).controller("TimelineCtrl",["$scope","Feed","$window","$http","$timeout",function(e,t,o,a,r){e.lessons=[],a.get(baseUrl+"timeline/api").then(function(t){e.lessons=t.data,r(function(){var t=$("#cd-timeline").data("card");""!=t&&angular.forEach(e.lessons,function(e){var o=e.date_d+"/"+e.date_m+"/"+e.date_y;o==t&&$("#modal"+e.id).openModal()})})},function(){alert("Ocorreu um erro ao carregar os exercícios do site!")}),e.reset_search=function(){e.search.$=""},e.role_helper=function(e){var t={dad:"Pai",mom:"Mãe",tutor:"Tutor",therapist:"Terap.",mediator:"Mediad.",coordinator:"Coord.",user:"Est."};return t[e]},e.materiaAtual=!1,e.mostrarMateria=function(t){0==e.materiaAtual?e.materiaAtual=t:e.materiaAtual=!1},e.mostrarDados=function(t,o){null!=t?e.mostrar=t:o.length>0&&(first=o[Object.keys(o)[0]],e.mostrar=first.role)}}]).controller("ExerciciosCtrl",["$scope","$http","$timeout","$interval","Exercicios","Upload",function(e,t,o,a,r,n){r.fetch_all().then(function(t){e.exercicios=t.data},function(){alert("Ocorreu um erro ao carregar os exercícios do site!")}),e.janela_expandida=!1,e.mensagem_selecionada=!1,e.resposta_enviada=!1,e.mensagem_enviada=!1,e.mostrar_formulario_nova_mensagem=!1,e.resposta={},e.carregando=!1,e.carregando_porcentagem=0,e.reset_search=function(){e.search.$="",e.fechar()},e.fechar=function(){e.janela_expandida=!1,e.mensagem_selecionada=!1,e.mostrar_formulario_nova_mensagem=!1},e.selecionar_mensagem=function(t){e.janela_expandida=!0,e.mensagem_selecionada=e.mensagem_selecionada!=t?t:!1},e.upload=function(t,o){e.carregando=!0,e.carregando_porcentagem=1,e.resposta.id=t,e.resposta.user_id=o,r.add_reply(e.resposta).then(function(t){e.resposta_enviada=!0,e.segundos_restantes=3,a(function(){e.segundos_restantes>0?e.segundos_restantes=e.segundos_restantes-1:window.location.reload()},1e3)},function(e){alert("Aconteceu um erro ao ser enviado a resposta. Tente novamente.")},function(t){var o=parseInt(100*evt.loaded/evt.total);e.carregando_porcentagem=o})}}]).controller("BatePapoCtrl",["$scope","$http","$timeout","$interval","Mensagens",function(e,t,o,a,r){e.mensagens=[],e.mensagem={},e.carregarMensagens=function(){r.fetch_all().success(function(t){e.mensagens=t})},e.enviar=function(t){r.send(t,e.usuarioLogado).success(function(t){e.carregarMensagens(),e.fechar(),Materialize.toast("Sua mensagem foi enviada com sucesso!",4e3)})},e.fechar=function(){$("#modalnova").closeModal(),$("#modalMensagem").closeModal()},e.visualizar=function(t){e.mensagem=t,$("#modalMensagem").openModal()},e.enviar_resposta=function(t,o){r.send_reply(t,o,e.usuarioLogado).success(function(t){e.resposta={},e.carregarMensagens(),e.fechar(),Materialize.toast("Sua resposta foi enviada com sucesso!",4e3)})},e.carregarMensagens()}]).controller("ListarRegistrosCtrl",["$scope","$http",function(e,t){e.filtro={ano:null,mes:null,aula:null},e.meses=[{nome:"Janeiro",registros:0,numero:1},{nome:"Fevereiro",registros:0,numero:2},{nome:"Março",registros:0,numero:3},{nome:"Abril",registros:0,numero:4},{nome:"Maio",registros:0,numero:5},{nome:"Junho",registros:0,numero:6},{nome:"Julho",registros:0,numero:7},{nome:"Agosto",registros:0,numero:8},{nome:"Setembro",registros:0,numero:9},{nome:"Outubro",registros:0,numero:10},{nome:"Novembro",registros:0,numero:11},{nome:"Dezembro",registros:0,numero:12}],e.meses_registros=[],e.aulas=[],t.post(baseUrl+"registros/api_registros_por_ano").then(function(t){e.aulas=t.data.lessons,e.meses_registros=t.data.meses}),e.reset_search=function(){e.search.$="",e.voltarParaAulas()},e.selecionarAula=function(t){e.filtro.aula=t,$("#listagem-aulas").slideUp(500,function(){$("#listagem-detalhes").slideDown(500)})},e.mudarAno=function(){$("#listagem-detalhes,#listagem-aulas,#listagem-meses").slideUp(500,function(){e.filtro.aula=null,e.filtro.mes=null,$("#listagem-meses").slideDown(500)})},e.getTotalRegistros=function(t){var o=0;return angular.forEach(e.meses_registros,function(e,a){a==t&&(o=e)}),o},e.selecionarMes=function(t){e.filtro.mes=t,$("#listagem-meses").slideUp(500,function(){$("#listagem-aulas").slideDown(500)})},e.voltarParaMeses=function(){$("#listagem-detalhes,#listagem-aulas").slideUp(500,function(){e.filtro.aula=null,e.filtro.mes=null,$("#listagem-meses").slideDown(500)})},e.voltarParaAulas=function(){$("#listagem-detalhes").slideUp(500,function(){e.filtro.aula=null,$("#listagem-aulas").slideDown(500)})}}]).controller("EditarRegistroCtrl",["$scope","Inputs","$timeout",function(e,t,o){e.registros=[],e.avancar=!0,e.loadItems=function(e){return console.log($("#registros-container").data("hashtags-disponiveis")),$("#registros-container").data("hashtags-disponiveis")},e.init=function(){e.hashtags=$("#registros-container").data("hashtags"),e.materias=$("#registros-container").data("materias"),e.admin_logged=$("#registros-container").data("admin-logged"),e.lesson_id=$("#registros-container").data("lesson-id"),t.fetch_all(e.lesson_id).then(function(t){e.registros=t.data.registros,e.campos=t.data.campos})},e.mudouData=function(o){t.validar_data(o).then(function(t){"INDISPONÍVEL"==t.data.status?e.avancar=!1:e.avancar=!0,Materialize.toast(t.data.message,1e4)})},e.init()}]).controller("EvolucaoCtrl",["$scope","$filter",function(e,t){e.graficos=[],$("div.grafico").each(function(){var t=$(this).data("dados");t.options.plotOptions.series.point={events:{click:function(){var e=this.name,t=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);if(t){var o=baseUrl+"timeline?card="+e,a=window.open(o,"_blank");a.focus()}}}},e.graficos.push(t)})}]).controller("AdicionarRegistrosCtrl",["$scope","$http","Inputs",function(e,t,o){e.avancar=!1,e.mudouData=function(t){o.validar_data(t).then(function(t){"INDISPONÍVEL"==t.data.status?e.avancar=!1:e.avancar=!0,Materialize.toast(t.data.message,1e4)})}}]).controller("AuthenticationController",["$scope",function(e){Materialize.showStaggeredList("#pep-lista-atores"),Materialize.fadeInImage("img"),e.roleChecked=!1,e.roles={tutors:"Tutor",schools:"Escola (Coordenação / Professor / Mediador / Outros)",protectors:"Família (Pai/Mãe/Outros)",therapists:"Terapeuta",users:"Aluno(a)"},e.roles_icons={tutors:"graduation-cap",schools:"building",protectors:"male",therapists:"user-md",users:"user"},e.setRole=function(t){e.roleChecked=t},e.getRole=function(){return void 0==e.roles[e.roleChecked]?"Quem é você?":e.roles[e.roleChecked]},e.getRoleIcon=function(){return e.roles_icons[e.roleChecked]},e.clear=function(){e.roleChecked=!1}}]).controller("CmsInputCtrl",["$scope",function(e){e.keyPressed=function(t){2==t.which&&e.adicionar_mais()},e.adicionar_mais=function(){e.input.config.options.push(""),setTimeout(function(){$("textarea").last().focus()},0)},e.$watch("input.type",function(t){"escala_texto"==t&&void 0==e.input.config&&(e.input.config={options:[""]})})}]).controller("CmsChartsCtrl",["$scope",function(e){e.$watch("chart",function(t){0==t.chart_inputs.length&&(e.chart.chart_inputs=[""])})}]),angular.module("RedePga").directive("materializeSelect",function(){return{link:function(e,t,o){$(t).material_select()}}}).directive("filtrarGrafico",function(){return{link:function(e,t,o){$(t).click(function(){$(".btn-filtro").removeClass("green"),$(this).addClass("green");var e=$(t).data("charts-related");$(".graficoHighchart").stop().fadeOut("fast",function(){for(var t=0;t<e.length;t++)$(".grafico"+e[t]).stop().fadeIn("slow")})})}}}).directive("expandirTimeline",function(){return{link:function(e,t,o){$(t).click(function(){$(this).fadeOut("fast",function(){$(this).parent().css("height","auto")})})}}}).directive("loading",["$http",function(e){return{restrict:"A",link:function(t,o,a){t.isLoading=function(){return e.pendingRequests.length>0},t.$watch(t.isLoading,function(e){e?o.removeClass("ng-hide"):o.addClass("ng-hide")})}}}]).directive("modal",function(){return{link:function(e,t,o){$(t).click(function(){var e=$(t).data("id");$("#modal"+e).openModal()})}}}).directive("datepicker",function(){return{link:function(e,t,o){$(t).datepicker({dateFormat:"dd/mm/yy"})}}}).directive("editor",function(){return{link:function(e,t,o){$(t).trumbowyg({btns:["formatting","btnGrp-semantic","link","btnGrp-justify","btnGrp-lists"]})}}}).directive("tabs",function(){return{link:function(e,t,o){$(t).tabs()}}}).directive("selectAluno",function(){return{link:function(e,t,o){$(t).change(function(){$(this).parent().submit()})}}}).directive("escolherCampo",function(){return{link:function(e,t,o){t.bind("change",function(){var a=t.find(":selected").data("type"),r=t.find(":selected").data("config"),n=o.indice;e.registros[n].type=a,"escala_numerica"==a?(e.registros[n].value=r.min,e.registros[n].config=r):"escala_texto"==a?(e.registros[n].value=r.options[0],e.registros[n].config=r):e.registros[n].value=null,e.$apply()})}}}),angular.module("RedePga").factory("Feed",["$http",function(e){return{fetch_all:function(t){return e.get(baseUrl+"feed/api/"+t)}}}]).factory("Inputs",["$http",function(e){return{fetch_all:function(t){return e.get(baseUrl+"registros/api_inputs/"+t)},validar_data:function(t){return e.get(baseUrl+"registros/api_validar_data?data="+t)}}}]).factory("Exercicios",["$http","Upload",function(e,t){return{add_reply:function(e){return t.upload({url:baseUrl+"exercicios/api_add_reply",data:{anexo:e.attachment,resposta:e}})},fetch_all:function(){return e.get(baseUrl+"Exercicios/api_fetch_all")}}}]).factory("Mensagens",["$http",function(e){return{send:function(t,o){return e.post("BatePapo/api_add_message",{mensagem:t,usuarioLogado:o})},send_reply:function(t,o,a){return e.post("BatePapo/api_add_reply",{resposta:t,usuarioLogado:a,message_id:o})},fetch_all:function(){return e.get("BatePapo/api_fetch_all")}}}]),angular.module("RedePga").controller("FormularioEdicaoUsuario",["$scope",function(e){}]).controller("AdminInputsCtrl",["$scope","$http",function(e,t){e.sortableOptions={stop:function(e,o){var a=$(this).sortable("serialize");console.log(a),t.get(baseUrl+"cms/inputs/sortable?"+a).then(function(e){})}}}]).controller("AdminChartsCtrl",["$scope","$http",function(e,t){e.sortableOptions={stop:function(e,o){var a=$(this).sortable("serialize");console.log(a),t.get(baseUrl+"cms/charts/sortable?"+a).then(function(e){})}}}]).controller("ConfigurarAtoresCtrl",["$scope","$http","$filter","$timeout",function(e,t,o,a){e.actor={model:"Protectors"},e.cancelarEdicao=function(){e.actor={model:"Protectors"}},e.get_label=function(e){var t={mediator:"Mediador",coordinator:"Coordenador",dad:"Pai",mom:"Mãe",therapist:"Terapeuta",tutor:"Tutor"};return t[e]},e.set_model=function(t){e.actor={model:t},"Tutors"==t&&(e.actor.role="tutor"),"Therapists"==t&&(e.actor.role="therapist")},e.set_actor=function(t,o){t.model=o,t.instituition_id=e.instituitions[t.instituition_id],delete t.password,e.actor=t};var r=document.location.toString();if(r.match("#")){var n=r.split("#")[1],i=n.replace("c_","");e.set_model(i),$(".panel-collapse").removeClass("in"),$("#"+n).addClass("in")}$(document).on("click",".ui-tabs-anchor",function(){a(function(){e.cancelarEdicao()})})}]).controller("NovoGraficoCtrl",["$scope","$http","$filter","$timeout",function(e,t,o,a){e.serieEmBranco=null,a(function(){var t=$("#card-grafico").data("chart");e.user_id=$("#card-grafico").data("user_id"),"undefined"!=t&&(e.emptyChart=t,e.serieEmBranco=e.emptyChart.series[0])}),t({method:"GET",url:baseUrl+"cms/api/inputs_disponiveis"}).then(function(t){e.inputs=t.data},function(e){}),t({method:"GET",url:baseUrl+"cms/api/materias_disponiveis"}).then(function(t){e.materias=t.data},function(e){}),e.mudouGrafico=function(){e.emptyChart.series.forEach(function(t,o){t.input_id&&e.trocou(o)})},e.trocou=function(o){var a=0;void 0!=e.emptyChart.series[o].theme_id&&(a=e.emptyChart.series[o].theme_id);var r={formato:e.emptyChart.format,tipo:e.emptyChart.series[o].type,materia:a,input:e.emptyChart.series[o].input_id,user_id:e.user_id};t.get(baseUrl+"cms/api/calcular_serie/"+r.user_id+"/"+r.input+"/"+r.formato+"/"+r.materia).then(function(t){e.emptyChart.series[o].data=t.data.data,"text"==t.data.type&&(e.emptyChart.series[o].type="pie")},function(e){})},e.adicionar=function(){var t={id:Math.floor(1e4*Math.random()+1),name:"Exemplo "+Math.floor(1e4*Math.random()+1),color:"#446CB3",type:"line"};a(function(){e.emptyChart.series.push(t)})},e.deletarSerie=function(t){return confirm("Voce tem certeza disto?")&&e.emptyChart.series.splice(t,1),!1}}]);