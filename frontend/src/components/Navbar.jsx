export default function Navbar(){
  return(
    <div className="flex justify-between items-center p-6">

      <h1 className="text-xl font-bold">
        ✨ Dehaze AI
      </h1>

      <button className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600">
        Upload Image
      </button>

    </div>
  )
}