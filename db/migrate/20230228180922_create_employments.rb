class CreateEmployments < ActiveRecord::Migration[7.0]
  def change
    create_table :employments do |t|
      t.boolean :employer, default: false
      t.date :start
      t.date :end
      t.references :user, null: false

      t.timestamps
    end
  end
end
