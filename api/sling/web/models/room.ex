defmodule Sling.Room do
  use Sling.Web, :model

  schema "rooms" do
    field :name, :string
    field :topic, :string
    many_to_many :users, Sling.User, join_through: "user_rooms"
    has_many :messages, Sling.Message, foreign_key: :room_id
    
    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, %{ "name" => name } = params \\ %{}) do
    params = Map.put(params, "topic", name <> " Working around")

    struct
    |> cast(params, [:name, :topic])
    |> validate_required([:name, :topic])
    |> unique_constraint(:name)
  end
end
