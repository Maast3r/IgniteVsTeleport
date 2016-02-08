class CreateChampions < ActiveRecord::Migration
  def change
    create_table :champions do |t|
      t.string :name
      t.string :title
      t.string :img
      t.string :splash_img
      t.string :loading_img
      t.timestamps null: false
    end
  end
end
