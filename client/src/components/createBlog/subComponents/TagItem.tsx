type TagItemProps = {
    tagName: String
}

const TagItem = (props: TagItemProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
        {props.tagName}
    </div>
  )
}

export default TagItem