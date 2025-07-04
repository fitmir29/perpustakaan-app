class CreatePeminjamen < ActiveRecord::Migration[8.0]
  def change
    create_table :peminjamen do |t|
      t.references :user, null: false, foreign_key: true
      t.references :buku, null: false, foreign_key: true
      t.date :tanggal_pinjam
      t.string :status

      t.timestamps
    end
  end
end
