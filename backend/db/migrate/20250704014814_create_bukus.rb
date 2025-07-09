# db/migrate/20250704014814_create_bukus.rb
class CreateBukus < ActiveRecord::Migration[8.0]
  def change
    create_table :bukus do |t|
      t.string :judul
      t.string :pengarang
      t.integer :tahun
      t.integer :stok

      t.timestamps
    end
  end
end
