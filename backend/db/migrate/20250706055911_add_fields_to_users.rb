class AddFieldsToUsers < ActiveRecord::Migration[6.1]
  def change
    # Kolom sudah ada, jadi tidak perlu ditambahkan lagi
    # add_column :users, :username, :string
    # add_column :users, :email, :string
  end
end
