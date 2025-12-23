<script lang="ts">
	interface Props {
		initialRotation?: number;
		imageSrc?: string;
		rotateOnHover?: boolean;
		width?: number;
		position?: "static" | "absolute";
		top?: number;
		left?: number;
		class?: string;
	}

	let {
		initialRotation = 0,
		imageSrc = "/images/cw_generic_developers.png",
		rotateOnHover = true,
		width = 260,
		position = "static",
		top = 0,
		left = 0,
		class: className,
	}: Props = $props();
</script>

<div
	class="polaroid-container ${className}"
	style={`width: ${width / 16}rem; top: ${top / 16}rem; left: ${left / 16}rem;`}
	class:rotate-on-hover={rotateOnHover}
	class:position-absolute={position === "absolute"}
>
	<div class="image-container">
		<img src={imageSrc} alt="polaroid" />
	</div>
</div>

<style lang="scss">
	.polaroid-container {
		aspect-ratio: 260 / 255;
		background-color: white;
		box-shadow: 0px 0px 1.1438rem rgba(104, 104, 104, 0.25);
		transform: rotate(5deg);

		.image-container {
			aspect-ratio: 244 / 196;
			overflow: hidden;
			padding: 0.5rem;

			img {
				height: 100%;
				width: 100%;
				object-fit: cover;
				background-color: #e3e3e3;
			}
		}

		&.rotate-on-hover {
			transition: transform 0.33s ease;
			&:hover {
				transform: rotate(0);
			}
		}

		&.position-absolute {
			position: absolute;
		}
	}
</style>
