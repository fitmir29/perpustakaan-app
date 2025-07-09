class AddFieldsToAdmins < ActiveRecord::Migration[8.0]
  def change
    # Hapus atau komen baris ini:
    # add_column :admins, :username, :string

    add_column :admins, :nama_lengkap, :string unless column_exists?(:admins, :nama_lengkap)
    add_column :admins, :role, :string unless column_exists?(:admins, :role)
  end
end
