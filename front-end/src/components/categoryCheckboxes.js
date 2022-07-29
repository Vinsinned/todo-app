function Checkboxes() {
	return (
		<div className="form-check form-check-inline">
			<input
				className="form-check-input"
				type="checkbox"
				name="positionOptions"
				id="positionIntern"
				value="Intern"
				checked={form.level === "Intern"}
				onChange={(e) => updateTodo({ level: e.target.value })}
			/>
			<label htmlFor="positionIntern" className="form-check-label">Intern</label>
		</div>
	)
}