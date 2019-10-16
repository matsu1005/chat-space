class CreateMessages < ActiveRecord::Migration[5.0]
  def up
    drop_table :messages
    create_table :messages do |t|
      t.string     :text
      t.string     :image
      t.references :user, foreign_key: true
      t.references :group, foreign_key: true
      t.timestamps
    end
  end
  def down
  end
end
