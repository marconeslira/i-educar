document.getElementById('ref_cod_instituicao').onchange = function () {
    getDuploEscolaCurso();
}

document.getElementById('ref_cod_escola').onchange = function () {
    getEscolaCurso();
}

document.getElementById('ref_cod_curso').onchange = function () {
    getSerie();

    var campoDisciplinas = document.getElementById('disciplinas');
    campoDisciplinas.innerHTML = "Nenhuma série selecionada";
}

function getDisciplina(xml_disciplina) {
    var campoDisciplinas = document.getElementById('disciplinas');
    var DOM_array = xml_disciplina.getElementsByTagName("disciplina");
    var conteudo = '';

    if (DOM_array.length) {
        conteudo += '<div style="margin-bottom: 10px; float: left">';
        conteudo += '  <span style="display: block; float: left; width: 250px;">Nome</span>';
        conteudo += '  <label span="display: block; float: left; width: 100px">Carga horária</span>';
        conteudo += '  <label span="display: block; float: left">Usar padrão do componente?</span>';
        conteudo += '</div>';

        conteudo += '<br style="clear: left" />';
        conteudo += '<div style="margin-bottom: 10px; float: left">';
        conteudo += "  <label style='display: block; float: left; width: 350px;'><input type='checkbox' name='CheckTodos' onClick='marcarCheck(" + '"disciplinas[]"' + ");'/>Marcar todos</label>";
        conteudo += "  <label style='display: block; float: left; width: 100px;'><input type='checkbox' name='CheckTodos2' onClick='marcarCheck(" + '"usar_componente[]"' + ");';/>Marcar todos</label>";
        conteudo += '</div>';
        conteudo += '<br style="clear: left" />';

        for (var i = 0; i < DOM_array.length; i++) {
            id = DOM_array[i].getAttribute("cod_disciplina");

            conteudo += '<div style="margin-bottom: 10px; float: left">';
            conteudo += '  <label style="display: block; float: left; width: 250px;"><input type="checkbox" name="disciplinas[' + id + ']" id="disciplinas[]" value="' + id + '">' + DOM_array[i].firstChild.data + '</label>';
            conteudo += '  <label style="display: block; float: left; width: 100px;"><input type="text" name="carga_horaria[' + id + ']" value="" size="5" maxlength="7"></label>';
            conteudo += '  <label style="display: block; float: left"><input type="checkbox" id="usar_componente[]" name="usar_componente[' + id + ']" value="1">(' + DOM_array[i].getAttribute("carga_horaria") + ' h)</label>';
            conteudo += '</div>';
            conteudo += '<br style="clear: left" />';
        }
    } else {
        campoDisciplinas.innerHTML = 'A série/ano escolar não possui componentes '
            + 'curriculares cadastrados.';
    }

    if (conteudo) {
        campoDisciplinas.innerHTML = '<table cellspacing="0" cellpadding="0" border="0">';
        campoDisciplinas.innerHTML += '<tr align="left"><td>' + conteudo + '</td></tr>';
        campoDisciplinas.innerHTML += '</table>';
    }
}

document.getElementById('ref_cod_serie').onchange = function () {
    var campoSerie = document.getElementById('ref_cod_serie').value;

    var campoDisciplinas = document.getElementById('disciplinas');
    campoDisciplinas.innerHTML = "Carregando disciplina";

    var xml_disciplina = new ajax(getDisciplina);
    xml_disciplina.envia("educar_disciplina_xml.php?ser=" + campoSerie);
};

after_getEscola = function () {
    getEscolaCurso();
    getSerie();

    var campoDisciplinas = document.getElementById('disciplinas');
    campoDisciplinas.innerHTML = "Nenhuma série selecionada";
};

function getSerie() {
    var campoCurso = document.getElementById('ref_cod_curso').value;

    if (document.getElementById('ref_cod_escola')) {
        var campoEscola = document.getElementById('ref_cod_escola').value;
    } else if (document.getElementById('ref_ref_cod_escola')) {
        var campoEscola = document.getElementById('ref_ref_cod_escola').value;
    }

    var campoSerie = document.getElementById('ref_cod_serie');

    campoSerie.length = 1;

    limpaCampos(4);

    if (campoEscola && campoCurso) {
        campoSerie.disabled = true;
        campoSerie.options[0].text = 'Carregando séries';

        var xml = new ajax(atualizaLstSerie);
        xml.envia("educar_serie_not_escola_xml.php?esc=" + campoEscola + "&cur=" + campoCurso);
    } else {
        campoSerie.options[0].text = 'Selecione';
    }
}

function atualizaLstSerie(xml) {
    var campoSerie = document.getElementById('ref_cod_serie');
    campoSerie.length = 1;
    campoSerie.options[0].text = 'Selecione uma série';
    campoSerie.disabled = false;

    series = xml.getElementsByTagName('serie');
    if (series.length) {
        for (var i = 0; i < series.length; i++) {
            campoSerie.options[campoSerie.options.length] = new Option(
                series[i].firstChild.data,
                series[i].getAttribute('cod_serie'),
                false,
                false
            );
        }
    } else {
        campoSerie.options[0].text = 'O curso não possui nenhuma série ou todas as séries já estã associadas a essa escola';
        campoSerie.disabled = true;
    }
}

function marcarCheck(idValue) {
    // testar com formcadastro
    var contaForm = document.formcadastro.elements.length;
    var campo = document.formcadastro;
    var i;

    if (idValue == 'disciplinas[]') {
        for (i = 0; i < contaForm; i++) {
            if (campo.elements[i].id == idValue) {
                campo.elements[i].checked = campo.CheckTodos.checked;
            }
        }
    } else if (idValue == 'usar_componente[]') {
        for (i = 0; i < contaForm; i++) {
            if (campo.elements[i].id == idValue) {
                campo.elements[i].checked = campo.CheckTodos2.checked;
            }
        }

    } else if (idValue == 'etapas_especificas[]') {
        for (i = 0; i < contaForm; i++) {
            if (campo.elements[i].id == idValue) {
                campo.elements[i].checked = campo.CheckTodos3.checked;
            }
        }
    }
}

$j('.etapas_utilizadas').mask("9,9,9,9", {placeholder: "1,2,3..."});
