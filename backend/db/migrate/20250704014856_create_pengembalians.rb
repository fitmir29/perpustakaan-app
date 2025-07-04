class CreatePengembalians < ActiveRecord::Migration[8.0]
  def change
    create_table :pengembalians do |t|
      t.references :peminjaman, null: false, foreign_key: true
      t.date :tanggal_kembali
      t.integer :denda

      t.timestamps
    end
  end
end
