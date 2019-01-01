<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class InsertPortalFuncionarioVinculoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared(
            file_get_contents(__DIR__ . '/../../sqls/inserts/portal.funcionario_vinculo.sql')
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared(
            'TRUNCATE portal.funcionario_vinculo CASCADE;'
        );
    }
}
