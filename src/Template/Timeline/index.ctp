<section id="cd-timeline" ng-controller="TimelineCtrl">

  <div class="cd-timeline-block" ng-repeat="lesson in lessons">

  <!-- Modal Structure -->
<div id="modal{{lesson.id}}" class="modal modal-fixed-footer">
  <div class="modal-content">
    <h4 class="center">{{lesson.date_d}}/{{lesson.date_m}}/{{lesson.date_y}}</h4>

    <div class="card-panel red white-text" ng-if="!lesson.formatted_data">Não há dados de atores nesta aula ainda. Aproveite e inclua alguns dados! <a href="<?php echo $this->Url->build(['controller' => 'registros', 'action' => 'editar']); ?>/{{lesson.id}}">Clique aqui</a></div>

    <ul class="collection">

    <li class="collection-item" ng-if="lesson.formatted_data">

    <!-- Listagem de atores participantes -->
    <div class="atores"  ng-repeat="(author_id, entries) in lesson.formatted_data">
      <strong>
          {{role_helper(lesson.actors[author_id].role)}}: {{lesson.actors[author_id].full_name }}
      </strong> <!-- .chip -->

      <div class="dados-ator">

        <div class="col s6" ng-repeat="entry in entries">

          <div style="border: 1px solid #CCC; border-collapse: collapse; padding: 10px; margin-bottom: 10px; min-height: 100px;" ng-if="entry.value != ''">

            <strong>{{entry.input.name}}</strong>

            <p>{{entry.value}}</p>
          </div>

        </div>

        <div class="clearfix"></div>

      </div> <!-- .dados-ator -->
    </div> <!-- .atores -->

    </li>

    <!-- Hashtags -->
    <li class="collection-item" ng-if="lesson.lesson_hashtags.length > 0">

      <strong>Hashtags</strong>
      <div class="clearfix"></div>

      <a href="<?php echo $this->Url->build('/feed/') ?>?hashtag_id={{entries.hashtag.id}}" class="chip chip-hashtag grey lighten-3" title="Clique para filtrar pela hashtag" ng-repeat="(id, entries) in lesson.lesson_hashtags">
        #{{entries.hashtag.name }}
      </a> <!-- .chip -->

    </li>

    <!-- Matérias -->
    <li class="collection-item" ng-if="lesson.lesson_themes.length > 0">

      <div class="materias" ng-repeat="(id, entries) in lesson.lesson_themes">
        <strong>
          {{entries.theme.name }}
        </strong> <!-- .chip -->

        <div class="dados-materia">

          <div class="col s6" ng-if="entries.observation">

            <div style="border: 1px solid #CCC; border-collapse: collapse; padding: 10px; margin-bottom: 10px; min-height: 100px;">
              <strong>Observação</strong> <div class="clearfix"></div> {{entries.observation}}
            </div>
          </div>

          <div class="col s6" ng-if="entries.nota_esperada">

            <div style="border: 1px solid #CCC; border-collapse: collapse; padding: 10px; margin-bottom: 10px; min-height: 100px;">
              <strong>Nota Esperada</strong> <div class="clearfix"></div> {{entries.nota_esperada}}
            </div>
          </div>

          <div class="col s6" ng-if="entries.nota_alcancada">

            <div style="border: 1px solid #CCC; border-collapse: collapse; padding: 10px; margin-bottom: 10px; min-height: 100px;">
              <strong>Nota Alcançada</strong> <div class="clearfix"></div> {{entries.nota_alcancada}}
            </div>
          </div>

          <div class="clearfix"></div>

        </div> <!-- .dados-materia -->

        </div> <!-- .materias -->

    </li>

      </ul>

  </div>

  <div class="modal-footer">
    <a href="<?php echo $this->Url->build(['controller' => 'registros', 'action' => 'editar']); ?>/{{lesson.id}}" class="modal-action modal-close waves-effect waves-green btn-flat">Adicionar novas informações a esta aula</a>
    <a href="#!" class="modal-action modal-close waves-effect waves-red btn-flat">Fechar</a>
  </div>
</div> <!-- #modal -->


    <div class="cd-timeline-img" style="background: #33d1ff;">
    </div> <!-- cd-timeline-img -->

    <div class="cd-timeline-content">
      <h2>{{lesson.date_d}}/{{lesson.date_m}}/{{lesson.date_y}}</h2>

      <!-- Card Title -->
  <span class="card-title text-center"></span>

  <div class="clearfix"></div>

  <div class="card-panel small grey lighten-3" ng-if="lesson.formatted_data.length == 0">
    Não há registros para esta aula.
  </div>

  <!-- Listagem de atores participantes -->
  <p ng-repeat="(author_id, entries) in lesson.formatted_data">
      {{role_helper(lesson.actors[author_id].role)}}: {{lesson.actors[author_id].full_name }}
  </p> <!-- .chip -->

  <div class="clearfix"></div>

  <!-- Listagem de hashtags -->
  <a href="<?php echo $this->Url->build('/feed/') ?>?hashtag_id={{entries.hashtag.id}}" class="chip chip-hashtag grey lighten-3" ng-repeat="(id, entries) in lesson.lesson_hashtags">
    #{{entries.hashtag.name }}
  </a> <!-- .chip -->

      <a href="javascript:;" data-id="{{lesson.id}}" modal class="cd-read-more">Veja mais</a>
    </div> <!-- cd-timeline-content -->
  </div> <!-- cd-timeline-block -->

</section>