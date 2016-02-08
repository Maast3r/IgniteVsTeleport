class CreateLastMatchIndices < ActiveRecord::Migration
  def change
    create_table :last_match_indices do |t|
      t.integer :index
      t.timestamps null: false
    end
  end
end
