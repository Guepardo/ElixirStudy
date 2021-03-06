defmodule Sling.Repo.Migrations.CreateRoom do
  use Ecto.Migration

  def change do
    create table(:rooms) do
      add :name, :string
      add :topic, :string, defualt: ""

      timestamps()
    end

    create unique_index(:rooms, [:name])
  end
end
