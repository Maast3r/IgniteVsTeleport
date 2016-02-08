class CreateRanks < ActiveRecord::Migration
  def change
    create_table :ranks do |t|
      t.string :lane
      t.string :rank
      t.integer :wins
      t.integer :losses
      t.boolean :has_one
      t.boolean :tele
      t.belongs_to :champion, index: true
      t.timestamps null: false
    end
  end
end
