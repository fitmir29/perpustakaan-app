class CreatePeminjaman < ActiveRecord::Migration[8.0]
  def change
    create_table :peminjaman do |t|
      t.references :user, null: false, foreign_key: true
      t.references :buku, null: false, foreign_key: true
      t.date :tanggal_pinjam
      t.date :tanggal_kembali
      t.string :status, default: "dipinjam"

      t.timestamps
    end
  end
end
