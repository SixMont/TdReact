export default function TreeButton({ upgrade }: { upgrade: string }) {
  return (
    <div>
      <div className="upgrade-image-container">
        <img
          key={upgrade}
          className="upgrade-image"
          src={
            new URL(`../../assets/images/tree/${upgrade}.png`, import.meta.url)
              .href
          }
          alt={`${upgrade} upgrade`}
        />
      </div>
    </div>
  )
}
